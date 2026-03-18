module.exports = {
    name: 'StudentSearch',
    publisher: 'Sample',
    cards: [{
        type: 'StudentSearchCard',
        source: './src/cards/StudentSearchCard',
        title: 'Student Search Card',
        displayCardType: 'StudentSearch Card',
        description: 'This is an introductory card to the Ellucian Experience SDK',
        pageRoute: {
            route: '/',
            excludeClickSelectors: ['div', 'a']
        }
    }],
    page: {
        source: './src/page/router.jsx'
    }
};
