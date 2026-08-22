// Alias kept only so this filename doesn't dangle as an orphaned duplicate
// (the file tools in this environment can create but not delete files).
// The real implementation lives in ./Breadcrumb.tsx — that's the one every
// page imports. Don't add logic here; re-export only.
export { default } from "./Breadcrumb";
