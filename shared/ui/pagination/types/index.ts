export interface IPagination {
    onNext: () => void;
    onPrev: () => void;
    total: number;
    currentPage: number;
    onSelect: (page: number) => void;
    className?: string;
}
