import React from 'react';
import { Link } from 'react-router-dom';

const iframeStyle = {
    border: '0', 
    width: '100%',
     height: '100%'
}
const View3D = () => {
    return (

        
<iframe src='http://localhost:8081/index.html' 
style={iframeStyle} height="100%" width="100%">
</iframe>
    )
}

export default View3D;
