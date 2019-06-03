import React from 'react';
import {Provider} from 'react-redux';
import {connect} from 'react-redux';
import {test} from './store/actions/ations'

class Test extends React.Component {
    render(){
        console.log(this.props)
        return(
            <div>
                <button onClick = {this.add}>CL</button>
            </div>
        )
    }
    add = () =>this.props.plus(5)
};

function mapDispatchToProps(dispatch){
    return{
        plus: (number)=> dispatch(test(number))
    }
}
function mapStateToProps(state){
    return{
        test: state.test
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Test);