import { isFunction } from './autounsubscribe';

export function Loader({ loadingProperty ='loadingData'}) {
    return function(constructor) {
        let original = constructor.prototype.ngOnInit;
        if(!isFunction(original)) {
            throw new Error(
                `${
                  constructor.name
                } is using @Loader but does not implement OnInit`
              );
        }
        constructor.prototype.ngOnInit = function() {
            let loadingController = this['loadingController'];
            if(loadingController) {
                loadingController.create({ message: 'Loading'}).then((loader) => {
                    this[loadingProperty] = loader;
                });
            } else {
                throw new Error(
                    `${
                        constructor.name
                      } is using @Loader but does not inject the LoadingController`
                )
            }

           isFunction(original) && original.apply(this);
        }
    }
}