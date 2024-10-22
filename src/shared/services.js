import Helper from "shared/helper";
import { apiUrl as serverApi } from "config";

const GetEntityInfo = async (name) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}${name}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}



 


	    
	 	
	
		
/* OrderAlerts */

const GetOrderAlertsCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}OrderAlerts/$count`;
        if (query) url = `${serverApi}OrderAlerts/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetOrderAlertsMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}OrderAlerts`;
        if (query) url = `${serverApi}OrderAlerts?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetOrderAlertSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}OrderAlerts(${id})`;
        if (params) {
            url = `${serverApi}OrderAlerts(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetOrderAlertSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.OrderAlertId;
        let method = "POST";
        let url = `${serverApi}OrderAlerts`;
        if (input.OrderAlertId && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}OrderAlerts(${input.OrderAlertId})`;
        } else if (input.OrderAlertId && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}OrderAlerts(${input.OrderAlertId})`;
        }

        delete input['OrderAlertId'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.OrderAlertId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
   							// For Nested APIs
			/* $navPropName */

const SetOrderAlertItemvendorJoin = async (input) => {     return new Promise(async (resolve) => {
        
        const { Id, OrderAlertId, VendorID, Deleted } = input;
        
        let method = "POST";
        let url = `${serverApi}OrderAlertItemvendors`;
        let data = { VendorID, OrderAlertId: OrderAlertId };

        if (Id && !Deleted) {
            method = "PATCH";
            url = `${serverApi}OrderAlertItemvendors(${Id})`;
        } else if (Id && Deleted) {
            method = "DELETE";
            data = {};
            url = `${serverApi}OrderAlertItemvendors(${Id})`;
        }
        
        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.Id });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, Id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetOrderAlertItemvendorJoin = async (idValue) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}OrderAlertItemvendors?$filter=OrderAlertId eq ${idValue}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json?.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

		                        		
	
	    
	 	
	
		
/* Restuarants */

const GetRestuarantsCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}Restuarants/$count`;
        if (query) url = `${serverApi}Restuarants/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetRestuarantsMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Restuarants`;
        if (query) url = `${serverApi}Restuarants?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetRestuarantSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Restuarants(${id})`;
        if (params) {
            url = `${serverApi}Restuarants(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetRestuarantSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.RestuarantID;
        let method = "POST";
        let url = `${serverApi}Restuarants`;
        if (input.RestuarantID && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Restuarants(${input.RestuarantID})`;
        } else if (input.RestuarantID && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Restuarants(${input.RestuarantID})`;
        }

        delete input['RestuarantID'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.RestuarantID });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
   							// For Nested APIs
			/* $navPropName */

const SetRestuarantItemlistJoin = async (input) => {     return new Promise(async (resolve) => {
        
        const { Id, RestuarantID, ItemId, Deleted } = input;
        
        let method = "POST";
        let url = `${serverApi}RestuarantItemlists`;
        let data = { ItemId, RestuarantID: RestuarantID };

        if (Id && !Deleted) {
            method = "PATCH";
            url = `${serverApi}RestuarantItemlists(${Id})`;
        } else if (Id && Deleted) {
            method = "DELETE";
            data = {};
            url = `${serverApi}RestuarantItemlists(${Id})`;
        }
        
        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.Id });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, Id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetRestuarantItemlistJoin = async (idValue) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}RestuarantItemlists?$filter=RestuarantID eq ${idValue}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json?.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

		                        		
	
	    
	 	
	
		
/* PurchaseOrders */

const GetPurchaseOrdersCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}PurchaseOrders/$count`;
        if (query) url = `${serverApi}PurchaseOrders/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetPurchaseOrdersMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}PurchaseOrders`;
        if (query) url = `${serverApi}PurchaseOrders?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetPurchaseOrderSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}PurchaseOrders(${id})`;
        if (params) {
            url = `${serverApi}PurchaseOrders(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetPurchaseOrderSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.PurchaseOrderId;
        let method = "POST";
        let url = `${serverApi}PurchaseOrders`;
        if (input.PurchaseOrderId && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}PurchaseOrders(${input.PurchaseOrderId})`;
        } else if (input.PurchaseOrderId && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}PurchaseOrders(${input.PurchaseOrderId})`;
        }

        delete input['PurchaseOrderId'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.PurchaseOrderId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
	
	
	    
	 	
	
		
/* Items */

const GetItemsCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}Items/$count`;
        if (query) url = `${serverApi}Items/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetItemsMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Items`;
        if (query) url = `${serverApi}Items?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetItemsSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Items(${id})`;
        if (params) {
            url = `${serverApi}Items(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetItemsSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.ItemId;
        let method = "POST";
        let url = `${serverApi}Items`;
        if (input.ItemId && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Items(${input.ItemId})`;
        } else if (input.ItemId && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Items(${input.ItemId})`;
        }

        delete input['ItemId'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.ItemId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
   							// For Nested APIs
			/* $navPropName */

const SetItemsStockJoin = async (input) => {     return new Promise(async (resolve) => {
        
        const { Id, ItemId, InventoryId, Deleted } = input;
        
        let method = "POST";
        let url = `${serverApi}ItemsStocks`;
        let data = { InventoryId, ItemId: ItemId };

        if (Id && !Deleted) {
            method = "PATCH";
            url = `${serverApi}ItemsStocks(${Id})`;
        } else if (Id && Deleted) {
            method = "DELETE";
            data = {};
            url = `${serverApi}ItemsStocks(${Id})`;
        }
        
        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.Id });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, Id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetItemsStockJoin = async (idValue) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}ItemsStocks?$filter=ItemId eq ${idValue}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json?.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

		                        	   							// For Nested APIs
			/* $navPropName */

const SetItemsItemimageJoin = async (input) => {     return new Promise(async (resolve) => {
        
        const { Id, ItemId, DocId, Deleted } = input;
        
        let method = "POST";
        let url = `${serverApi}ItemsItemimages`;
        let data = { DocId, ItemId: ItemId };

        if (Id && !Deleted) {
            method = "PATCH";
            url = `${serverApi}ItemsItemimages(${Id})`;
        } else if (Id && Deleted) {
            method = "DELETE";
            data = {};
            url = `${serverApi}ItemsItemimages(${Id})`;
        }
        
        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.Id });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, Id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetItemsItemimageJoin = async (idValue) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}ItemsItemimages?$filter=ItemId eq ${idValue}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json?.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

		                        		
	
	    
	 	
	
		
/* Vendors */

const GetVendorsCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}Vendors/$count`;
        if (query) url = `${serverApi}Vendors/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetVendorsMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Vendors`;
        if (query) url = `${serverApi}Vendors?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetVendorSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Vendors(${id})`;
        if (params) {
            url = `${serverApi}Vendors(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetVendorSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.VendorID;
        let method = "POST";
        let url = `${serverApi}Vendors`;
        if (input.VendorID && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Vendors(${input.VendorID})`;
        } else if (input.VendorID && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Vendors(${input.VendorID})`;
        }

        delete input['VendorID'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.VendorID });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
   							// For Nested APIs
			/* $navPropName */

const SetVendorOrderdetailsJoin = async (input) => {     return new Promise(async (resolve) => {
        
        const { Id, VendorID, PurchaseOrderId, Deleted } = input;
        
        let method = "POST";
        let url = `${serverApi}VendorOrderdetailss`;
        let data = { PurchaseOrderId, VendorID: VendorID };

        if (Id && !Deleted) {
            method = "PATCH";
            url = `${serverApi}VendorOrderdetailss(${Id})`;
        } else if (Id && Deleted) {
            method = "DELETE";
            data = {};
            url = `${serverApi}VendorOrderdetailss(${Id})`;
        }
        
        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.Id });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, Id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetVendorOrderdetailsJoin = async (idValue) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}VendorOrderdetailss?$filter=VendorID eq ${idValue}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json?.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

		                        		
	
	    
           
 	
     


/* Document */ 
const SetDocumentSingleMedia = async (input, headers) => {     return new Promise(async (resolve) => {
        let id = headers.DocId;
        let method = "POST";
        let url = `${serverApi}Documents`;
                                                                delete headers['DocId'];
        delete headers['Deleted'];

        const formData = new FormData();
        formData.append('file', input);

        try {
            const res = await fetch(url, {
                method, body: formData,
                headers: {
                    ...headers
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.DocId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
const GetDocumentSingleMedia = async (id, value, type) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}Documents(${id})`;
        if (value) {
            url = `${serverApi}Documents(${id})/$value`;
        }

        try {
            const res = await fetch(url, {
                method: "GET"
            });

            if (res.status === 200) {
                let data = null;
                if (value) {
                    data = await res.text();
                    if (!Helper.IsNullValue(data)) {
                        if (data.startsWith("data:")) {
                            data = data.substring(data.indexOf('data:'));
                        } else {
                            let tmp = data.split('\r\n');
                            for (let img of tmp) {
                                if (img.startsWith("data:")) data = img;
                            }
                        }
                    }
                    return resolve({ status: res.ok, values: data });
                }
                data = await res.json();
                return resolve({ status: res.ok, values: data });
            }
            return resolve({ status: false, statusText: "Failed fetching data" });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

     
	        	
	
	
	    
	 	
	
		
/* Inventories */

const GetInventoriesCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}Inventories/$count`;
        if (query) url = `${serverApi}Inventories/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetInventoriesMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Inventories`;
        if (query) url = `${serverApi}Inventories?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetInventorySingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Inventories(${id})`;
        if (params) {
            url = `${serverApi}Inventories(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetInventorySingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.InventoryId;
        let method = "POST";
        let url = `${serverApi}Inventories`;
        if (input.InventoryId && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Inventories(${input.InventoryId})`;
        } else if (input.InventoryId && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Inventories(${input.InventoryId})`;
        }

        delete input['InventoryId'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.InventoryId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
   							// For Nested APIs
			/* $navPropName */

const SetInventoryStockalertJoin = async (input) => {     return new Promise(async (resolve) => {
        
        const { Id, InventoryId, OrderAlertId, Deleted } = input;
        
        let method = "POST";
        let url = `${serverApi}InventoryStockalerts`;
        let data = { OrderAlertId, InventoryId: InventoryId };

        if (Id && !Deleted) {
            method = "PATCH";
            url = `${serverApi}InventoryStockalerts(${Id})`;
        } else if (Id && Deleted) {
            method = "DELETE";
            data = {};
            url = `${serverApi}InventoryStockalerts(${Id})`;
        }
        
        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.Id });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, Id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetInventoryStockalertJoin = async (idValue) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}InventoryStockalerts?$filter=InventoryId eq ${idValue}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json?.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

		                        		
	
 


// Below is a reference function - a possible business logic for ecom reference app
const GetProductStatus = async (productId) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}ProductOnBoardings?$filter=ProductId eq ${productId}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                let _tmp = { Status: '' };
                if (json.value && json.value.length > 0) {
                    _tmp = json.value[0];
                }
                return resolve({ status: res.ok, values: _tmp });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}




const GetMetaData = async () => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}$metadata`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            if (res.status === 200) {
                const values = await res.text();
                return resolve({ status: res.ok, values });
            }

            return resolve({ status: false, statusText: "Failed fetching data" });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

/* Prodict List View Details */
const GetProductOnBoardings = async () => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}ProductOnBoardings`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

export {
 GetEntityInfo,  GetOrderAlertsCount, GetOrderAlertsMulti, GetOrderAlertSingle, SetOrderAlertSingle, SetOrderAlertItemvendorJoin, GetOrderAlertItemvendorJoin, GetRestuarantsCount, GetRestuarantsMulti, GetRestuarantSingle, SetRestuarantSingle, SetRestuarantItemlistJoin, GetRestuarantItemlistJoin, GetPurchaseOrdersCount, GetPurchaseOrdersMulti, GetPurchaseOrderSingle, SetPurchaseOrderSingle, GetItemsCount, GetItemsMulti, GetItemsSingle, SetItemsSingle, SetItemsStockJoin, GetItemsStockJoin, SetItemsItemimageJoin, GetItemsItemimageJoin, GetVendorsCount, GetVendorsMulti, GetVendorSingle, SetVendorSingle, SetVendorOrderdetailsJoin, GetVendorOrderdetailsJoin, SetDocumentSingleMedia, GetDocumentSingleMedia, GetInventoriesCount, GetInventoriesMulti, GetInventorySingle, SetInventorySingle, SetInventoryStockalertJoin, GetInventoryStockalertJoin, GetProductStatus, GetMetaData, GetProductOnBoardings
};
