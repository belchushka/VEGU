
export interface IFilterField {
    title: string
    queryParam: string
}

export interface IFilter {
    name: string
    title: string
    fields: Array<IFilterField>
    selected?: Array<string>
}
