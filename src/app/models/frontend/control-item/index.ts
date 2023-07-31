import { Icon } from "../icon";

export type Value = string | number | boolean | null | undefined;

export interface ControlItem {
    value: Value;
    label: string;
    icon?: Icon;
}