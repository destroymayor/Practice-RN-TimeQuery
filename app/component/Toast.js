import Toast from 'react-native-root-toast';
module.exports = function(text) {
    Toast.show(text, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 500
    });
};