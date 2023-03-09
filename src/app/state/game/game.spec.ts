import * as actions from './game.actions';

describe('NgRx Game', () => {

    describe('actions', () => {
        let expectedActionPrefix = '[Game]';

        it('all action types should begin with ' + expectedActionPrefix, () => {
            Object.keys(actions).map(key => {
                let foundPrefix = (actions as any)[key]().type.slice(0, expectedActionPrefix.length);
                expect(foundPrefix).toEqual(expectedActionPrefix);
            })
        });

        it('has no duplicate actions', () => {
            
        });
    });
});