import { Theme } from '@aws-amplify/ui-react';

export const AmplifyTheme: Theme = {
    name: 'GlobalRecruits Amplify Theme',
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