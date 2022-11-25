import { startCase } from 'lodash'
import { DefaultNamingStrategy } from 'typeorm'
import { camelCase } from 'typeorm/util/StringUtils'
import LoggerService from '../logger/logger.service'

const firstLetterCase = (name: string) => name.charAt(0).toUpperCase() + name.slice(1)

export class CustomNamingStrategy extends DefaultNamingStrategy {
  columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
    const name = customName || propertyName

    if (embeddedPrefixes.length) {
      const prefix = camelCase(
        [...embeddedPrefixes, customName ? '' : propertyName].map((key) => startCase(key).replace(/\s+/gim, '')).join('')
      )
      return prefix + firstLetterCase(customName ?? '')
    }
    
    LoggerService.info(`columnName: ${name}`)
    
    return name
  }
}