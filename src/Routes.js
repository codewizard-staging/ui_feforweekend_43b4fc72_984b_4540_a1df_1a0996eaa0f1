import React from "react";
import { Routes, Route } from "react-router-dom";
import {
ItemsCreate, ItemsEdit, ItemsView, 
Items
} from "screens";

const Component = (props) => {

    return (
        <Routes>
            

                        
                                                        <Route path="Itemses/view/:id" element={<ItemsView {...props} title={'View Items'} />} />
                        <Route path="Itemses/edit/:id" element={<ItemsEdit {...props} title={'Edit Items'} />} />
                        <Route path="Itemses/create" element={<ItemsCreate {...props} title={'Create Items'} />} />
                                                <Route path="/" element={<Itemses {...props} title={'Table Layout'} nolistbar={true} />} />

                <Route path="/productsqq" element={<Items {...props} title={'Table Layout'} />} />
        </Routes>
    )

};

export default Component;