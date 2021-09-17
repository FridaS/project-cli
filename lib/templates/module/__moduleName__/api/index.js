import Ajax from '@common/utils/ajax'

export default {
    test(params) { // test
        return Ajax.post('/test', params)
    }
}