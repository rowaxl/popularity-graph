export interface Prefecture {
  prefCode: number
  prefName: string
  checked?: boolean
}

export interface PopulationSingleData {
  year: number
  value: number
}

export interface PrefectureResponse {
  result: Prefecture[]
}

export interface PopulationResponse {
  result: {
    data: PopulationSingleData[]
  }
}
