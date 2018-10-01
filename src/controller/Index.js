import React from "react";
import BaseComponent from "../components/common/BaseComponent";
import withStyles from "material-ui/styles/withStyles";
import customStyle from "../assets/jss/view/custom";
import {observer} from "mobx-react";
import {inject} from "mobx-react/index";
import {Use} from "../utils/annotation";
import {setTitle} from "../utils/comUtils";
// import Tooltip from "material-ui/Tooltip";
import ChartistGraph from "react-chartist";
import GridContainer from "../components/Grid/GridContainer.jsx";
import ItemGrid from "../components/Grid/ItemGrid.jsx";
import Button from "../components/CustomButtons/Button.jsx";
import ChartCard from "../components/Cards/ChartCard.jsx";
import StatsCard from "../components/Cards/StatsCard.jsx";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Refresh from "@material-ui/icons/Refresh";
import Edit from "@material-ui/icons/Edit";
import Chartist from "chartist";
import {DeviceIcon, UserIcon} from "../components/common/SvgIcons";
import Path from "../utils/path";

const delays = 80;
const durations = 500;
const delays2 = 80;
const durations2 = 500;

const dailySalesChart = {
    data: {
        labels: ["M", "T", "W", "T", "F", "S", "S"],
        series: [[12, 17, 7, 17, 23, 18, 38]]
    },
    options: {
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
        low: 0,
        high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
    },
    // for animation
    animation: {
        draw: function (data) {
            if (data.type === "line" || data.type === "area") {
                data.element.animate({
                    d: {
                        begin: 600,
                        dur: 700,
                        from: data.path
                            .clone()
                            .scale(1, 0)
                            .translate(0, data.chartRect.height())
                            .stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            } else if (data.type === "point") {
                data.element.animate({
                    opacity: {
                        begin: (data.index + 1) * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: "ease"
                    }
                });
            }
        }
    }
};

const emailsSubscriptionChart = {
    data: {
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Mai",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ],
        series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]]
    },
    options: {
        axisX: {
            showGrid: false
        },
        low: 0,
        high: 1000,
        chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
        }
    },
    responsiveOptions: [
        [
            "screen and (max-width: 640px)",
            {
                seriesBarDistance: 5,
                axisX: {
                    labelInterpolationFnc: function (value) {
                        return value[0];
                    }
                }
            }
        ]
    ],
    animation: {
        draw: function (data) {
            if (data.type === "bar") {
                data.element.animate({
                    opacity: {
                        begin: (data.index + 1) * delays2,
                        dur: durations2,
                        from: 0,
                        to: 1,
                        easing: "ease"
                    }
                });
            }
        }
    }
};


const completedTasksChart = {
    data: {
        labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
        series: [[230, 750, 450, 300, 280, 240, 200, 190]]
    },
    options: {
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
        low: 0,
        high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
    },
    animation: {
        draw: function (data) {
            if (data.type === "line" || data.type === "area") {
                data.element.animate({
                    d: {
                        begin: 600,
                        dur: 700,
                        from: data.path
                            .clone()
                            .scale(1, 0)
                            .translate(0, data.chartRect.height())
                            .stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            } else if (data.type === "point") {
                data.element.animate({
                    opacity: {
                        begin: (data.index + 1) * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: "ease"
                    }
                });
            }
        }
    }
};
@withStyles({
    ...customStyle,
    ...{
        gradeItem: {
            margin: 0,
            backgroundColor: 'white',
            backgroundRepeat: 'no-repeat',
            padding: '.6rem .6rem .6rem 4rem',
            borderBottom: '1px solid #dedede',
            backgroundSize: 'auto 60%',
            backgroundPosition: '.6rem center'
        },
        gradeItemPrimary: {
            fontSize: '1rem',
            fontWeight: 400,
            margin: 0
        },
        gradeItemPrimaryRight: {
            float: 'right',
            fontSize: '1.4rem'
        },
        gradeItemSecond: {
            margin: '.2rem 0 0 0',
            fontSize: '.8rem'
        },
        picture: {
            width: '4rem',
            height: '4rem',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        },
        nickname: {
            margin: 0,
            color: 'white',
            fontSize: '1rem',
            textShadow: '1px 1px 4px black'
        },
        viewName: {
            margin: 0,
            color: 'white',
            fontSize: '1.4rem',
            textShadow: '1px 1px 4px black'
        },
        staticsTitle: {
            margin: 0,
            fontSize: '.9rem',
            padding: '.2rem .6rem',
            backgroundColor: '#f6f6f6',
        },
        deviceUserInfo: {
            top: '4rem',
            right: '.6rem',
            color: 'white',
            position: 'absolute',
            textShadow: '1px 1px 4px black'
        }
    }
})
@inject("statisticsState", "userState")
@observer
export default class Index extends BaseComponent {

    constructor(props) {
        super(props);
        setTitle("推送管理平台");
        this.state = {};
    }

    componentDidMount() {
        this.refreshStatistics();
    }

    render() {
        const {loginUserData, configData} = this.props.userState;
        const {indexStatisticsData} = this.props.statisticsState;
        const {agent} = configData || {};
        const {classes = ""} = this.props;
        return <div>
            <GridContainer>
                <ItemGrid xs={12} sm={6} md={6} lg={3} onClick={() => this.linkTo(Path.PATH_NODE_LIST)}>
                    <StatsCard
                        icon={DeviceIcon}
                        iconColor="orange"
                        title="推送服务器"
                        description={indexStatisticsData.nodeNum || 0}
                        small="台"
                        statIcon={UserIcon}
                        statIconColor="danger"
                        statLink={{text: "总人设备数：" + indexStatisticsData.onLineUserNum}}
                    />
                </ItemGrid>
            </GridContainer>

            <GridContainer>
                <ItemGrid xs={12} sm={12} md={4}>
                    <ChartCard
                        chart={
                            <ChartistGraph
                                className="ct-chart-white-colors"
                                data={dailySalesChart.data}
                                type="Line"
                                options={dailySalesChart.options}
                                listener={dailySalesChart.animation}
                            />
                        }
                        underChart={
                            <div>
                                <Button color="infoNoBackground" justIcon>
                                    <Refresh className={classes.underChartIcons}/>
                                </Button>
                                <Button color="defaultNoBackground" justIcon>
                                    <Edit className={classes.underChartIcons}/>
                                </Button>
                            </div>
                        }
                        hover
                        chartColor="blue"
                        title="连接总设备"
                        text={
                            <span>
                                <span className={classes.successText}>
                                    <ArrowUpward className={classes.upArrowCardCategory}/> 55%
                                </span>
                                {" "}
                                increase in today sales.
                            </span>
                        }
                        statIcon={AccessTime}
                        statText="updated 4 minutes ago"
                    />
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={4}>
                    <ChartCard
                        chart={
                            <ChartistGraph
                                className="ct-chart-white-colors"
                                data={emailsSubscriptionChart.data}
                                type="Bar"
                                options={emailsSubscriptionChart.options}
                                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                                listener={emailsSubscriptionChart.animation}
                            />
                        }
                        underChart={
                            <div>
                                {/*<Tooltip
                                    id="tooltip-top"
                                    title="Refresh"
                                    placement="bottom"
                                    classes={{tooltip: classes.tooltip}}
                                >
                                    <Button color="infoNoBackground" justIcon>
                                        <Refresh className={classes.underChartIcons}/>
                                    </Button>
                                </Tooltip>
                                <Tooltip
                                    id="tooltip-top"
                                    title="Change Date"
                                    placement="bottom"
                                    classes={{tooltip: classes.tooltip}}
                                >
                                    <Button color="defaultNoBackground" justIcon>
                                        <Edit className={classes.underChartIcons}/>
                                    </Button>
                                </Tooltip>*/}
                            </div>
                        }
                        hover
                        chartColor="orange"
                        title="Email Subscriptions"
                        text="Last Campaign Performance"
                        statIcon={AccessTime}
                        statText="campaign sent 2 days ago"
                    />
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={4}>
                    <ChartCard
                        chart={
                            <ChartistGraph
                                className="ct-chart-white-colors"
                                data={completedTasksChart.data}
                                type="Line"
                                options={completedTasksChart.options}
                                listener={completedTasksChart.animation}
                            />
                        }
                        underChart={
                            <div>
                                {/*<Tooltip
                                    id="tooltip-top"
                                    title="Refresh"
                                    placement="bottom"
                                    classes={{tooltip: classes.tooltip}}
                                >
                                    <Button color="infoNoBackground" justIcon>
                                        <Refresh className={classes.underChartIcons}/>
                                    </Button>
                                </Tooltip>
                                <Tooltip
                                    id="tooltip-top"
                                    title="Change Date"
                                    placement="bottom"
                                    classes={{tooltip: classes.tooltip}}
                                >
                                    <Button color="defaultNoBackground" justIcon>
                                        <Edit className={classes.underChartIcons}/>
                                    </Button>
                                </Tooltip>*/}
                            </div>
                        }
                        hover
                        chartColor="red"
                        title="Completed Tasks"
                        text="Last Campaign Performance"
                        statIcon={AccessTime}
                        statText="campaign sent 2 days ago"
                    />
                </ItemGrid>
            </GridContainer>
        </div>;
    }

    refreshStatistics = () => {
        this.props.statisticsState.getIndexStatisticsData();
    }
}
