import React from 'react';
import { ButtonBase, Button, Card } from '@material-ui/core';
import { Fund } from '../contract/Contract';
import { Styles } from '../style/Styles';
import StarRatings from 'react-star-ratings'

interface IFundViewProps {
    fund: Fund;
}

interface IFundViewStates {
}


export class FundView extends React.Component<IFundViewProps, IFundViewStates> {

    constructor(props: any) {
        super(props)

    }

    render() {
        let rating = this.props.fund.rating ? Number(this.props.fund.rating.toFixed(2)) : 0
        let oneYearReturn = this.props.fund.returns.oneYear ? this.props.fund.returns.oneYear.toFixed(2) : 0
        let oneYearReturnValue = oneYearReturn >= 0 ? `+${oneYearReturn}%` : `${oneYearReturn}%`
        let oneYearReturnClass = oneYearReturn >= 0 ? Styles.CardReturn : Styles.CardReturnNegative
        return (
            <React.Fragment>
                <Card style={Styles.CardView} className="layout-column">
                    {/* <div className="layout-column"> */}
                    <div className="layout-row  layout-xs-column flex-50">
                        <div className="flex-70 flex-auto">
                            <span style={Styles.CardName} >{this.props.fund.name}</span>
                        </div>
                        <div className="flex-auto layout-row layout-align-center-start">
                            <StarRatings
                                rating={rating}
                                starRatedColor="orange"
                                starDimension="20px"
                                starSpacing="3px"
                            />
                        </div>

                    

                    </div>
                    <div className="layout-row flex-50" style={Styles.grid}>
                        <div className="layout-column flex-35">
                            <span style={Styles.CardSemiTitle} >{`1yr returns`}</span>
                            <span style={oneYearReturnClass}>{oneYearReturnValue}</span>
                        </div>

                        <div className="layout-column flex-35">
                            <span style={Styles.CardSemiTitle}  >{`AUM`}</span>
                            <span style={Styles.CardData}>{`₹${this.props.fund.aum} Cr`}</span>
                        </div>

                        <div className="layout-column flex-35">
                            <span style={Styles.CardSemiTitle} >{`Expense Ratio`}</span>
                            <span style={Styles.CardData}>{`${this.props.fund.expenseRatio}%`}</span>
                        </div>
                    </div>

                    {/* </div> */}
                </Card>

            </React.Fragment>
        )
    }
}

export default FundView;