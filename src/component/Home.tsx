import React from 'react';
import FundView from './FundView';
import { MutualFund, ViewState } from '../contract/Contract';
import { IndWealth } from '../service/INDService';
import { CircularProgress } from '@material-ui/core';
import { Styles } from '../style/Styles';
import InfiniteLoader from 'react-infinite-loader';

interface IHomeProps {
}

interface IHomeStates {
    fundData: MutualFund;
    viewState: ViewState;
}

function getHomeStyle() {
    return {
        minHeight: "-webkit-fill-available",
        backgroundColor: `#fafafa`
    }
}

export class Home extends React.Component<IHomeProps, IHomeStates> {

    constructor(props: any) {
        super(props)

        this.state = { fundData: { data: [] }, viewState: ViewState.InProgress }
    }

    getFunds = () => {
        let offset = this.state.fundData.data!.length

        IndWealth.getMutualFunds(offset)
            .then((response) => {
                return response.json();
            })
            .then((myJson: any) => {
                let newList = this.state.fundData.data!.concat(myJson.data)
                myJson.data = newList
                this.setState({ fundData: myJson, viewState: ViewState.Result })
            })
            .catch((error: any) => {

            })
    }

    getFundList = () => {
        return this.state.fundData.data!.map((fund) => (
            <FundView
                key={fund.id}
                fund={fund}
            />
        ))
    }

    handleVisit = () => {
        this.getFunds()
    }

    componentDidMount = () => {
        this.getFunds()
    }

    render() {
        let content;

        let spinner = (
            <div id="spinner" className="layout-column layout-align-center-center flex" style={Styles.spinnerContainer}>
                <CircularProgress style={Styles.isBusy} />
            </div>
        )

        switch (this.state.viewState) {
            case ViewState.Result:
                let fundList = this.getFundList()
                content = (
                    <React.Fragment>
                        <span style={Styles.header}>Explore Funds</span>
                        <span style={Styles.header}>{`Showing ${this.state.fundData.count} funds`}</span>
                        <div style={Styles.grid} className="layout-row layout-align-center-center">
                            {fundList}
                        </div>
                        <InfiniteLoader onVisited={() => this.handleVisit()}
                            loaderStyle={Styles.isBusyList}
                        />
                    </React.Fragment>
                )
                break;

            default:
                content = spinner
                break;
        }

        return (
            <React.Fragment>
                <div id="HomeComponet" className="layout-column " style={getHomeStyle()}>
                    {content}
                </div>
            </React.Fragment>
        )
    }
}

export default Home;