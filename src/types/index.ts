export type EventType = 'Ball' | 'Vogue Class' | 'Kiki Lounge'

export type VenueSize = 'Intimate' | 'Medium-Size' | 'Large'

export type SafetyLevel = 'green' | 'amber' | 'red'

export type SafetyInfo = {
  level: SafetyLevel
  summary: string
  area: {
    streetSafety: string
    transport: string
    lighting: string
  }
  venue: {
    staffAttitude: string
    queerEvents: string
    management: string
  }
  lastUpdated: string
  contributorCount: number
}

export type Venue = {
  id: string
  name: string
  area: string
  description: string
  pricePerHour: number
  capacity: number
  rating: number
  reviewCount: number
  responseTime: string
  tags: string[]
  suitableFor: EventType[]
  images: any[]
  latitude: number
  longitude: number
  isSaved: boolean
  size: VenueSize
  safety: SafetyInfo
}
