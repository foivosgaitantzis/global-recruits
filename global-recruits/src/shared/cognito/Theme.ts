import { Theme } from '@aws-amplify/ui-react';

export const AmplifyTheme: Theme = {
    name: 'GlobalRecruits Amplify Theme',
    tokens: {
        components: {
            link: {

                color: { value: '#4e2217' },
                active: {
                    color: 'red'
                }
            },
            textfield: {
                borderColor: { value: '#4e2217' }
            },
            button: {
                borderColor: { value: '#4e2217'},
                color: { value: '#4e2217' },
                _hover: {
                    backgroundColor: { value: '#4e2217' },
                    borderColor: { value: '#4e2217' },
                    color: 'white'
                },
                _focus: {
                    backgroundColor: { value: '#4e2217' },
                    borderColor: { value: '#4e2217' },
                    color: 'white'
                },
                _active: {
                    backgroundColor: { value: '#4e2217' },
                    borderColor: { value: '#4e2217' },
                    color: 'white'
                },
                primary: {
                    backgroundColor: { value: 'white' },
                    color: { value: '#4e2217' },
                    borderColor: { value: '#4e2217' },
                    _hover: {
                        backgroundColor: { value: '#4e2217' },
                        borderColor: { value: '#4e2217' },
                    },
                    _focus: {
                        backgroundColor: { value: '#4e2217' },
                        borderColor: { value: '#4e2217' },
                    },
                    _active: {
                        backgroundColor: { value: '#4e2217' },
                        borderColor: { value: '#4e2217' },
                    },
                },
                link: {
                    color: { value: '#4e2217' }
                }
            },
        }
    }
}