import React from 'react';
import UIIcons from '../icons/ui-icons';

export const renderMeasurementIcon = (measurement, className) => {
    if(measurement) {
        switch(measurement.measurementType) {
            case "COUNT_NUMBER": return <UIIcons.CounterIcon className={className} />;
            case 'CO2_PPM': return <UIIcons.Co2Icon className={className} />
            case 'TEMPERATURE_C': return <UIIcons.TemperatureIcon className={className} />
            case 'TEMPERATURE_ROAD_C': return <UIIcons.TemperatureIcon className={className} />
            case 'DEWPOINT_C': return <UIIcons.TemperatureIcon className={className} />
            case 'DISTANCE_CM': return <UIIcons.DistanceVerticalIcon className={className} />;
            case 'DETECTION_MOVEMENT': return <UIIcons.MovementIcon className={className} />
            case 'HUMIDITY_PCT': return <UIIcons.HumidityIcon className={className} />
            case 'LUX_LUMEN': return <UIIcons.LightIcon className={className} />
            case 'SOUND_PEAK': return <UIIcons.SoundIcon className={className} />
            case 'SOUND_AVERAGE': return <UIIcons.SoundIcon className={className} />
            case 'WINDDIRECTION_DGR': return <UIIcons.TemperatureIcon className={className} />
            case 'PRESSURE_HPA': return <UIIcons.TemperatureIcon className={className} />
            case 'WINDSPEED_MS': return <UIIcons.TemperatureIcon className={className} />
            case 'CLOUDHIGHT_M': return <UIIcons.TemperatureIcon className={className} />
            case 'CLOUDCOVER_PCT': return <UIIcons.TemperatureIcon className={className} />
            case 'RISK': return <UIIcons.BorderValueIcon className={className} />
            case 'BATTERY_PCT': return(renderBatteryIcon(measurement.value, className, {transform:'rotate(-90deg)'}))
            default: return <></>
        }
    }
}

export const renderBatteryIcon = (batteryStatus, className, style) => {
    if(batteryStatus) {
        const FULL = batteryStatus > 60;
        const MEDIUM = batteryStatus > 30 && batteryStatus <= 60;
        const LOW = batteryStatus !== null && batteryStatus <= 30;

        if(FULL) {
            return <UIIcons.BatteryLevelFullIcon style={style} className={className} />
        } else if (MEDIUM) {
            return <UIIcons.BatteryLevelMediumIcon style={style} className={className} />
        } else if (LOW) {
            return <UIIcons.BatteryLevelLowIcon style={style} className={className} />
        }
    }
}

export const renderMeasurementUnit = (measurementType) => {
  if(measurementType) {
    switch (measurementType.toUpperCase()) {
        case "DETECTION_MOVEMENT":
          return '';
        case "LUX_LUMEN":
          return '';
        case "DISTANCE_CM":
          return 'cm';
        case "COUNT_NUMBER":
          return '';
        case "CO2_PPM":
          return 'ppm';
        case "HUMIDITY_PCT":
          return '%';
        case "TEMPERATURE_C":
          return '°C';
        case "TEMPERATURE_ROAD_C":
          return '°C';
        case "BATTERY_PCT":
          return '%'
        case "DEWPOINT_C":
          return '°C'
        case "SOUND_PEAK":
          return 'dBspl'
        case "SOUND_AVERAGE":
          return 'dBspl'
        case "RISK":
          return ''
        case "WINDDIRECTION_DGR":
          return '°'
        case "PRESSURE_HPA":
          return 'hPa'
        case "WINDSPEED_MS":
          return 'm/s'
        case "CLOUDHIGHT_M":
          return 'm'
        case "CLOUDCOVER_PCT":
          return '%'
        default:
          return '';
      }
  }
}

export const renderMeasurementTitle = measurementType => {
  if(measurementType) {
    switch (measurementType.toUpperCase()) {
      case "DETECTION_MOVEMENT":
        return `Antal bevægelser`;
      case "LUX_LUMEN":
        return `Lux (lumens)`;
      case "DISTANCE_CM":
        return `Afstand fra top`;
      case "COUNT_NUMBER":
        return `Målinger (pr. dag)`;
      case "CO2_PPM":
        return `CO2 niveau`;
      case "HUMIDITY_PCT":
        return `Luftfugtighed`;
      case "TEMPERATURE_C":
        return `Lufttemperatur`;
      case "TEMPERATURE_ROAD_C":
        return `Vejtemperatur`;
      case "BATTERY_PCT":
        return "Batteri";
      case "DEWPOINT_C":
        return `Dugpunkt`;
      case "RISK":
        return `Risiko`; 
      case "SOUND_PEAK":
        return 'Gns. lydniveau'
      case "SOUND_AVERAGE":
        return 'Maks. lydniveau'
      case "WINDDIRECTION_DGR":
        return 'Wind direction'
      case "PRESSURE_HPA":
        return 'Pressure'
      case "WINDSPEED_MS":
        return 'Wind speed'
      case "CLOUDHIGHT_M":
        return 'Cloud height'
      case "CLOUDCOVER_PCT":
        return 'Cloud cover'
      default:
        return `(unknown)`;
    }
  } else {
    return '-'
  }
};