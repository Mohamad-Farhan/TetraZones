export interface AdjustOverflow {
    adjustX?: 0 | 1;
    adjustY?: 0 | 1;
}
export interface PlacementsConfig {
    arrowWidth?: number;
    horizontalArrowShift?: number;
    verticalArrowShift?: number;
    arrowPointAtCenter?: boolean;
    autoAdjustOverflow?: boolean | AdjustOverflow;
}
export declare function getOverflowOptions(autoAdjustOverflow?: boolean | AdjustOverflow): {
    adjustX: number;
    adjustY: number;
};
export default function getPlacements(config: PlacementsConfig): import("_rc-trigger@5.1.2@rc-trigger").BuildInPlacements;
