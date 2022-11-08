interface IButton {
    title: string;
    onClick?: () => void;
    meta?: any;
    file?: {
        onSelect: (file: File, meta?: any) => void;
        accept: string;
    };
}

export interface IButtonGroup {
    buttons: Array<IButton>
}
