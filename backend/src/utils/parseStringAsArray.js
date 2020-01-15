module.exports = function parseStringAsArray(ArrayAsStrinhg) {
    return ArrayAsStrinhg.split(',').map(techs => techs.trim());
}