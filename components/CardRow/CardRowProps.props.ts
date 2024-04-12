import {DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";

export interface CardRowProps
    extends DetailedHTMLProps<
        HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >{
    type: string
}
