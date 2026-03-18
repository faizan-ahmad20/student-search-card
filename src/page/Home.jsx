import { spacing20 } from '@ellucian/react-design-system/core/styles/tokens';
import { makeStyles, Typography } from '@ellucian/react-design-system/core';
import {
    usePageControl,
} from '@ellucian/experience-extension-utils';

const useStyles = makeStyles()({
    card: {
        margin: `0 ${spacing20}`,
    }
});

const HomePage = () => {
    const { classes } = useStyles();
    const { setPageTitle } = usePageControl();

    setPageTitle('Props and Hooks');

    return (
        <div className={classes.card}>
            <Typography variant={'h2'}>
                Properties
            </Typography>
        </div>
    );
};

export default HomePage;
