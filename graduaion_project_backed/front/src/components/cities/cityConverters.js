export const fromBackendObjectToJsObject = ({
    name,
    costPerCity,
    stateId
}) => {
    return {
        name,
        costPerCity,
        stateId
    }
}