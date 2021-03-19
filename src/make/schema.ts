import ts from "typescript"
import * as fs from "fs"
import { resolve, relative } from "path"
import * as TJS from "typescript-json-schema"

export default function (basePath, target) {
  const settings: TJS.PartialArgs = {}
  const compilerOptions: TJS.CompilerOptions = {
    aliasRef: true,
    //  topRef: true,
    //  ref: true,

    //  validationKeywords: true,
    strictNullChecks: true,
    excludePrivate: true,
    //  typeOfKeyword: true,
    //  defaultProps: true,
    //  noExtraProps: true,
    //  uniqueNames: true,
    propOrder: true,
    required: true,
    //  titles: true,
  }

  const files = ["index.ts"]

  // optionally pass a base path
  const program = TJS.getProgramFromFiles(
    files.map((s) => resolve(basePath, s)),
    compilerOptions
  )

  const diagnostics = ts.getPreEmitDiagnostics(program)
  if (diagnostics.length) {
    console.error(diagnostics)
  } else {
    const typeChecker = program.getTypeChecker()

    const symbols: TJS.SymbolRef[] = []
    const inheritingTypes: { [baseName: string]: string[] } = {}
    const workingDir = program.getCurrentDirectory()

    program.getSourceFiles().forEach((sourceFile, _sourceFileIdx) => {
      const relativePath = relative(workingDir, sourceFile.fileName)
      inspect(sourceFile, typeChecker)

      function inspect(node: ts.Node, tc: ts.TypeChecker) {
        switch (node.kind) {
          case ts.SyntaxKind.ClassDeclaration:
          case ts.SyntaxKind.InterfaceDeclaration:
          case ts.SyntaxKind.EnumDeclaration:
          case ts.SyntaxKind.TypeAliasDeclaration:
            const symbol: ts.Symbol = (<any>node).symbol
            const nodeType = tc.getTypeAtLocation(node)
            const fullyQualifiedName = tc.getFullyQualifiedName(symbol)
            const typeName = fullyQualifiedName.replace(/".*"\./, "")

            symbols.push({
              name: typeName,
              typeName,
              fullyQualifiedName,
              symbol,
            })
            const baseTypes = nodeType.getBaseTypes() || []

            console.log({ typeName, fullyQualifiedName, symbol })

            baseTypes.forEach((baseType) => {
              var baseName = tc.typeToString(
                baseType,
                undefined,
                ts.TypeFormatFlags.UseFullyQualifiedType
              )
              if (!inheritingTypes[baseName]) {
                inheritingTypes[baseName] = []
              }
              inheritingTypes[baseName].push(typeName)
            })
            break
          default:
            ts.forEachChild(node, (n) => inspect(n, tc))
        }
      }
    })
  }

  writeSchema(target, TJS.buildGenerator(program, settings))
}

function writeSchema(target: string, generator: TJS.JsonSchemaGenerator) {
  // all symbols
  ;["INDEX"].forEach((symbol) => {
    const schema = generator.getSchemaForSymbol(symbol)
    delete schema.$schema
    schema.$id = "http://giji.f5.si/schema.json"
    fs.writeFileSync(resolve(target), JSON.stringify(schema, undefined, 2))
  })
}
