import { resolve } from "path"
import * as TJS from "typescript-json-schema"

const settings: TJS.PartialArgs = {
}
const compilerOptions: TJS.CompilerOptions = {
  validationKeywords: true,
  strictNullChecks: true,
  excludePrivate: true,
  defaultProps: true,
  uniqueNames: true,
  propOrder: true,
  required: true,
  titles: true,
  id: true,
}

const files = [
  'random.ts',
  'chat.ts',
]
const symbols = [
  'Random',
  'ChatReport',
  'Chat',
]
// optionally pass a base path
const basePath = "./src/__spec__/type"
const program = TJS.getProgramFromFiles(
  files.map((s)=> resolve(basePath, s)),
  compilerOptions
)
const generator = TJS.buildGenerator(program, settings);

export const definitions = {}
export const properties = {}
function deploy(key: string, o: TJS.DefinitionOrBoolean) {
  definitions[key] = o
  if ('object' === typeof o && 'object' === o.type ) {
    properties[key] = o
  }
}

// all symbols
symbols.forEach((symbol)=>{
  const schema = generator.getSchemaForSymbol(symbol)
  for ( const key in schema.definitions ) {
    deploy(key, schema.definitions[key])
  }
  deploy(symbol, schema)

  console.log(schema)
})

console.log(JSON.stringify({definitions, properties}, undefined, 2))

