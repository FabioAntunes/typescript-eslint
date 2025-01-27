import path from 'path';
import ts from 'typescript';
import { Extra } from '../parser-options';

interface ASTAndProgram {
  ast: ts.SourceFile;
  program: ts.Program | undefined;
}

/**
 * Default compiler options for program generation from single root file
 */
const DEFAULT_COMPILER_OPTIONS: ts.CompilerOptions = {
  allowNonTsExtensions: true,
  allowJs: true,
  checkJs: true,
  noEmit: true,
  // extendedDiagnostics: true,
};

// This narrows the type so we can be sure we're passing canonical names in the correct places
type CanonicalPath = string & { __brand: unknown };
const getCanonicalFileName = ts.sys.useCaseSensitiveFileNames
  ? (path: string): CanonicalPath => path as CanonicalPath
  : (path: string): CanonicalPath => path.toLowerCase() as CanonicalPath;

function getTsconfigPath(tsconfigPath: string, extra: Extra): CanonicalPath {
  return getCanonicalFileName(
    path.isAbsolute(tsconfigPath)
      ? tsconfigPath
      : path.join(extra.tsconfigRootDir || process.cwd(), tsconfigPath),
  );
}

function canonicalDirname(p: CanonicalPath): CanonicalPath {
  return path.dirname(p) as CanonicalPath;
}

export {
  ASTAndProgram,
  canonicalDirname,
  CanonicalPath,
  DEFAULT_COMPILER_OPTIONS,
  getCanonicalFileName,
  getTsconfigPath,
};
