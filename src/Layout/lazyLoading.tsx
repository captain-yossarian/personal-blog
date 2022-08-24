import React from "react";

export const ComponentMap: Record<
  string,
  React.LazyExoticComponent<React.FC<{}>>
> = {
  About: React.lazy(() => import("../Sections/About")),
  Contact: React.lazy(() => import("../Sections/Contact")),
  Home: React.lazy(() => import("../Sections/Home")),
  Subscribe: React.lazy(() => import("../Sections/Subscribe")),
  MathOperations: React.lazy(() => import("../Chapters/MathOperations")),
  ReactChildren: React.lazy(() => import("../Chapters/ReactChildren")),
  ReactReturnType: React.lazy(() => import("../Chapters/ReactReturnType")),
  CompareArguments: React.lazy(() => import("../Chapters/CompareArguments")),
  RangeNumbers: React.lazy(() => import("../Chapters/RangeNumbers")),
  Tuples: React.lazy(() => import("../Chapters/Tuples")),
  UnionArray: React.lazy(() => import("../Chapters/UnionArray")),
  Callbacks: React.lazy(() => import("../Chapters/Callbacks")),
  PubSub: React.lazy(() => import("../Chapters/PubSub")),
  TypeState: React.lazy(() => import("../Chapters/TypeState")),
  Api: React.lazy(() => import("../Chapters/Api")),
  Unions: React.lazy(() => import("../Chapters/Unions")),
  TemplateLiterals: React.lazy(() => import("../Chapters/TemplateLiterals")),
  CallbackChain: React.lazy(() => import("../Chapters/CallbackChain")),
  FlattenUnion: React.lazy(() => import("../Chapters/FlattenUnion")),
  Permutations: React.lazy(() => import("../Chapters/Permutations")),
  Dates: React.lazy(() => import("../Chapters/Dates")),
  TypeNegation: React.lazy(() => import("../Chapters/TypeNegation")),
  HexValidation: React.lazy(() => import("../Chapters/HexValidation")),
  LinkedList: React.lazy(() => import("../Chapters/LinkedList")),
  OOP: React.lazy(() => import("../Chapters/OOP")),
  FP: React.lazy(() => import("../Chapters/FunctionalProgramming")),
  DeepPick: React.lazy(() => import("../Chapters/DeepPick")),
  Validation: React.lazy(() => import("../Chapters/Validations")),
  Mutations: React.lazy(() => import("../Chapters/Mutations")),
  ReactProps: React.lazy(() => import("../Chapters/ReactProps")),
  CurryingComponents: React.lazy(
    () => import("../Chapters/CurryingComponents")
  ),
  InferFunctionArguments: React.lazy(
    () => import("../Chapters/InferFunctionArguments")
  ),
  PrototypeTyping: React.lazy(() => import("../Chapters/PrototypeTyping")),
  SaferTypes: React.lazy(() => import("../Chapters/SaferTypes")),
  EvenLength: React.lazy(() => import("../Chapters/EvenLength")),
  FlattenTuple: React.lazy(() => import("../Chapters/FlattenTuple")),
  SafeEnum: React.lazy(() => import("../Chapters/SafeEnum")),
  RestTuples: React.lazy(() => import("../Chapters/RestTuples")),
  RecursiveDataStructures: React.lazy(
    () => import("../Chapters/RecursiveDataStructures")
  ),
  EmailValidation: React.lazy(() => import("../Chapters/EmailValidation")),
  GenericResolving: React.lazy(() => import("../Chapters/GenericResolving")),
  UsefulPatterns: React.lazy(() => import("../Chapters/UsefulPatterns")),
  PathManipulations: React.lazy(() => import("../Chapters/PathManipulations")),
  Ukraine: React.lazy(() => import("../Chapters/Ukraine")),
  Utils: React.lazy(() => import("../Chapters/Utils")),
};
