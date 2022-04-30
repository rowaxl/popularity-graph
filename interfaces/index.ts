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
    data: {
      label: string
      data: PopulationSingleData[]
    }[]
  }
}

export interface PopulationMap {
  prefName: string
  prefCode: number
  color: string
  data: PopulationSingleData[]
}
