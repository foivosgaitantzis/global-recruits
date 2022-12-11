import { Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
    name: 'Auth Example Theme',
    tokens: {
        components: {
            tabs: {
                item: {
                    _active: {
                        color: "black",
                        borderColor: "black"
                    },
                    _focus: {
                        color: "black"
                    },
                    _hover: {
                        color: "black"
                    }
                }
            }
        }
    }
}

export default theme;