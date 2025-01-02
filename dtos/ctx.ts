import { RouteParams, RouterContext } from "@oak/oak/router";
import { State } from "@oak/oak/application";

export type Ctx = RouterContext<string, RouteParams<string>, State>;