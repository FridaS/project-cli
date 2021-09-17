import Ajax from './ajax'

export default {
    test(params) { // test
        return Ajax.post('/test', params)
    }
}