import { getProgramFromFiles } from "typescript-json-schema"
import * as ts from "typescript"
import * as fs from "fs"
import { resolve } from "path"
import { exit } from "process"

interface InterfaceDefinition {
  name: string
  obj: Object
}

interface Property {
  name: string
  props: {
    // TODO to enum
    type: string
    nullable: boolean
    child?: Object
  }
}

// getProgramFromFiles()

const rootNames = [`./src/__spec__/type/index.ts`]
const options = {} // getTsConfig(".")
const program = ts.createProgram({ rootNames, options })
const checker = program.getTypeChecker()
console.log(checker)
//console.log(program.getSourceFiles().map((o)=>{o.fileName}), Object.keys(program))

const sources = {}
compile()

function getTsConfig(
  rootDirectory: string,
  configName: string = "tsconfig.json"
): ts.ParsedCommandLine {
  const parseConfigHost: ts.ParseConfigHost = {
    fileExists: ts.sys.fileExists,
    readFile: ts.sys.readFile,
    readDirectory: ts.sys.readDirectory,
    useCaseSensitiveFileNames: true,
  }

  const configFileName = ts.findConfigFile(
    rootDirectory,
    ts.sys.fileExists,
    configName
  )
  const configFile = ts.readConfigFile(configFileName, ts.sys.readFile)
  const compilerOptions = ts.parseJsonConfigFileContent(
    configFile.config,
    parseConfigHost,
    rootDirectory
  )

  return compilerOptions
}

export function compile() {
  const path = resolve(`./src/__spec__/type`, `index.ts`)
  getSource(path, "")
}

export function getSource(path: string, literal: string) {
  if (sources[path]) return

  console.log(path, literal)
  const file = ts.createSourceFile(
    path,
    fs.readFileSync(path).toString(),
    ts.ScriptTarget.ES2020,
    true
  )
  sources[path] = file
  file.forEachChild((node) => {
    if (ts.isImportDeclaration(node)) {
      getImport(node, path)
    }
    if (ts.isTypeElement(node)) {
      const def = scanObject(node)
      console.log(node)
    }
  })
}

function getImport(parent: ts.ImportDeclaration, path: string) {
  parent.forEachChild((node) => {
    if (ts.isStringLiteral(node)) {
      const literal = node.getFullText()
      const target = resolve(path, "..", literal.slice(2, -1) + ".ts")
      getSource(target, literal)
    }
  })
}

function scanObject(parent: ts.Node): InterfaceDefinition {
  let obj = {}
  let name: string

  ts.forEachChild(parent, (node) => {
    switch (node.kind) {
      case ts.SyntaxKind.Identifier:
        const identifier = <ts.Identifier>node
        name = identifier.text
        break

      case ts.SyntaxKind.PropertySignature:
        const prop = scanProperty(node)
        obj[prop.name] = prop.props
        break
    }
  })

  return {
    name: name,
    obj: obj,
  }
}

function scanProperty(parent: ts.Node): Property {
  let obj: Property = {
    name: "",
    props: {
      type: "",
      nullable: false,
    },
  }

  ts.forEachChild(parent, (node) => {
    switch (node.kind) {
      case ts.SyntaxKind.Identifier:
        const identifier = <ts.Identifier>node
        obj.name = identifier.text
        break

      case ts.SyntaxKind.QuestionToken:
        obj.props.nullable = true
        break
      case ts.SyntaxKind.NumberKeyword:
        obj.props.type = "number"
        break
      case ts.SyntaxKind.StringKeyword:
        obj.props.type = "string"
        break
      case ts.SyntaxKind.BooleanKeyword:
        obj.props.type = "boolean"
        break
      case ts.SyntaxKind.AnyKeyword:
        obj.props.type = "any"
        break
      case ts.SyntaxKind.TypeReference:
        ts.forEachChild(node, (node) => {
          // TDOO ここでIdentifier以外なら、generics
          switch (node.kind) {
            case ts.SyntaxKind.Identifier:
              const identifier = <ts.Identifier>node
              // TODO Arrayのとき
              obj.props.type = identifier.text
              break
          }
        })
        break
      case ts.SyntaxKind.TypeLiteral:
        obj.props.type = "Object"
        obj.props.child = scanObject(node).obj
        break
    }
  })

  return obj
}
