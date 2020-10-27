import { MEASUREMENT_TYPES } from './types'
import Api from '../api'

const types = [
    {
        "name": "BATTERY_LEVEL",
        "measureType": "battery",
        "measureUnit": "level",
        "info": "",
        "convertId": "2",
        "isForecast": false,
        "id": "fe6b6fda-45c1-4591-a46b-5e593f9ae0bd",
        "client": null,
        "type": "measurementtype"
    },
    {
        "name": "TEMPERATURE_C",
        "measureType": "temperature",
        "measureUnit": "c",
        "info": "",
        "convertId": "4;5",
        "isForecast": false,
        "id": "c267ad80-9c1e-480f-a2d1-b892e07ab4f4",
        "client": null,
        "type": "measurementtype"
    },
    {
        "name": "LUX_LUMEN",
        "measureType": "lux",
        "measureUnit": "lumen",
        "info": "",
        "convertId": "8",
        "isForecast": false,
        "id": "cfe8e51e-aaeb-4b42-aa43-2c724dadde08",
        "client": null,
        "type": "measurementtype"
    },
    {
        "name": "DETECTION_MOVEMENT",
        "measureType": "detection",
        "measureUnit": "movement",
        "info": "1",
        "convertId": null,
        "isForecast": false,
        "id": "36ede7c5-b419-46ce-986d-7ce90a209d85",
        "client": null,
        "type": "measurementtype"
    },
    {
        "name": "CO2_PPM",
        "measureType": "co2",
        "measureUnit": "ppm",
        "info": "123",
        "convertId": null,
        "isForecast": false,
        "id": "6e7d4188-21fc-4ef6-96c4-dc828b754a7f",
        "client": null,
        "type": "measurementtype"
    },
    {
        "name": "BATTERY_ENUM",
        "measureType": "battery",
        "measureUnit": "enum",
        "info": "123",
        "convertId": null,
        "isForecast": false,
        "id": "0746a31b-9420-45a1-b528-83b7f90fddf1",
        "client": null,
        "type": "measurementtype"
    },
    {
        "name": "DISTANCE_CM",
        "measureType": "distance",
        "measureUnit": "cm",
        "info": "",
        "convertId": "1",
        "isForecast": false,
        "id": "d35eaeb4-9453-4c68-bcd1-16b0162279b4",
        "client": null,
        "type": "measurementtype"
    },
    {
        "name": "HUMIDITY_PCT",
        "measureType": "humidity",
        "measureUnit": "pct",
        "info": "",
        "convertId": "7;12",
        "isForecast": false,
        "id": "ea638ef9-f880-4ebd-8f0e-484b32320edf",
        "client": null,
        "type": "measurementtype"
    },
    {
        "name": "BATTERY_PCT",
        "measureType": "battery",
        "measureUnit": "pct",
        "info": "",
        "convertId": "3",
        "isForecast": false,
        "id": "65c1ce39-aff0-4a1f-87e6-15922e2a4e57",
        "client": null,
        "type": "measurementtype"
    },
    {
        "name": "COUNT_NUMBER",
        "measureType": "count",
        "measureUnit": "number",
        "info": "",
        "convertId": "10",
        "isForecast": false,
        "id": "0367c070-f767-420c-88f1-dd81ae8feb37",
        "client": null,
        "type": "measurementtype"
    },
    {
        "name": "DEWPOINT_C",
        "measureType": "dewpoint",
        "measureUnit": "c",
        "info": "123",
        "convertId": null,
        "isForecast": false,
        "id": "139f622a-17a3-4ea2-b66f-c4108e67347b",
        "client": null,
        "type": "measurementtype"
    },
    {
        "name": "RISK",
        "measureType": "risk",
        "measureUnit": "level",
        "info": "",
        "convertId": null,
        "isForecast": false,
        "id": "472735b7-5fdd-4e01-ba4a-17d5d651d742",
        "client": null,
        "type": "measurementtype"
    },
    {
        "name": "TEMPERATURE_ROAD_C",
        "measureType": "temperature",
        "measureUnit": "c",
        "info": "",
        "convertId": "",
        "isForecast": false,
        "id": "db841bd0-e28c-4f5c-bde2-66a8e00a4220",
        "client": null,
        "type": "measurementtype"
    },
    {
        "name": "SOUND_PEAK",
        "measureType": "peak sound",
        "measureUnit": "db",
        "info": "",
        "convertId": null,
        "isForecast": false,
        "id": "b89165d7-3311-47a0-880c-a2110b42448b",
        "client": null,
        "type": "measurementtype"
    },
    {
        "name": "SOUND_AVERAGE",
        "measureType": "average sound",
        "measureUnit": "db",
        "info": "",
        "convertId": null,
        "isForecast": false,
        "id": "89c3b0ec-8ae1-4bca-86c7-c9c893eea946",
        "client": null,
        "type": "measurementtype"
    }
]

export const getMeasurementTypes = () => {
    return (dispatch) => {
        // return Api.getMeasurementTypes()
        //     .then(res => {
        //         dispatch({ type: MEASUREMENT_TYPES.LOADED, payload: res.data });
        //     });
            dispatch({ type: MEASUREMENT_TYPES.LOADED, payload: types });
    }
}