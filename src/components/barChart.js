import React from 'react';
import {csv} from 'd3-fetch';
import {multiSelectData, barChartData, sourceData} from '../utils';
import MultiSelect from 'react-select';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries
} from 'react-vis';

let firstPersonData = [];
let firstPersonSourceData = [];
let secondPersonData = [];
let secondPersonSourceData = [];

let firstPersonBarData = [{x: '總收入(百萬)', y: 0}, {x: '捐贈企業數(家)', y: 0}];
let secondPersonBarData = [{x: '總收入(百萬)', y: 0}, {x: '捐贈企業數(家)', y: 0}];

let firstPersonSourceBarData = [{x: '個人捐贈收入', y: 0},
                                                    {x: '營利事業捐贈收入', y: 0},
                                                    {x: '政黨捐贈收入', y: 0},
                                                    {x: '人民團體捐贈收入', y: 0},
                                                    {x: '匿名捐贈收入', y: 0},
                                                    {x: '其他收入', y: 0}];

let secondPersonSourceBarData = [{x: '個人捐贈收入', y: 0},
                                                         {x: '營利事業捐贈收入', y: 0},
                                                         {x: '政黨捐贈收入', y: 0},
                                                         {x: '人民團體捐贈收入', y: 0},
                                                         {x: '匿名捐贈收入', y: 0},
                                                         {x: '其他收入', y: 0}];

const customStyles1 = {
  control: (base, state) => ({
    ...base,
    background: '#339999',
    // match with the menu
    borderRadius: state.isFocused ? '3px 3px 0 0' : 3,
    // Overwrittes the different states of border
    borderColor: state.isFocused ? 'yellow' : 'green',
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    '&:hover': {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? 'red' : 'blue'
    }
  }),
  menu: base => ({
    ...base,
    // override border radius to match the box
    borderRadius: 0,
    // kill the gap
    marginTop: 0
  }),
  menuList: base => ({
    ...base,
    // kill the white space on first and last option
    padding: 0
  })
};

const customStyles2 = {
  control: (base, state) => ({
    ...base,
    background: '#79C7E3',
    // match with the menu
    borderRadius: state.isFocused ? '3px 3px 0 0' : 3,
    // Overwrittes the different states of border
    borderColor: state.isFocused ? 'yellow' : 'green',
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    '&:hover': {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? 'red' : 'blue'
    }
  }),
  menu: base => ({
    ...base,
    // override border radius to match the box
    borderRadius: 0,
    // kill the gap
    marginTop: 0
  }),
  menuList: base => ({
    ...base,
    // kill the white space on first and last option
    padding: 0
  })
};

const divStyle = {
  display: 'flex',
  alignItems: 'center'
};

export default class RootComponent extends React.Component {
  state = {
    loading: true,
    selectedOption: null,
    selectedOption2: null,
    multiSelectData: null
  }

  componentWillMount() {
    csv('data/A05_basic_all.csv')
      .then(data => this.setState({
        multiSelectData: multiSelectData(data),
        barChartData: barChartData(data),
        sourceData: sourceData(data),
        loading: false
      }));
  }

  handleChange = (selectedOption) => {
    this.setState({selectedOption});
    firstPersonData = this.state.barChartData.filter(person => person.姓名 === selectedOption.value);
    firstPersonSourceData = this.state.sourceData.filter(person => person.姓名 === selectedOption.value);
    firstPersonBarData = [];
    firstPersonSourceBarData = [];

    for (let [key, value] of Object.entries(firstPersonData[0])) {
      if (key !== '姓名') {
        if (key === '總收入') {
          key = key + '(百萬)';
          value = Math.abs(Number(value)) / 1.0e+6;
        } else if (key === '捐贈企業數') {
          key = key + '(家)';
        }
        firstPersonBarData.push({x: key, y: value});
      }
    }
    for (let [key, value] of Object.entries(firstPersonSourceData[0])) {
      if (key !== '姓名') {
          value = value.replace(/\,/g,'');
          value = Math.abs(Number(value)) / 1.0e+6;
          firstPersonSourceBarData.push({x: key, y: value});
      }
    }
  }

  handleChange2 = (selectedOption2) => {
    this.setState({selectedOption2});
    secondPersonData = this.state.barChartData.filter(person => person.姓名 === selectedOption2.value);
    secondPersonSourceData = this.state.sourceData.filter(person => person.姓名 === selectedOption2.value);
    secondPersonBarData = [];
    secondPersonSourceBarData = [];

    for (let [key, value] of Object.entries(secondPersonData[0])) {
      if (key !== '姓名') {
        if (key === '總收入') {
          key = key + '(百萬)';
          value = Math.abs(Number(value)) / 1.0e+6;
        } else if (key === '捐贈企業數') {
          key = key + '(家)';
        }
        secondPersonBarData.push({x: key, y: value});
      }
    }
    for (let [key, value] of Object.entries(secondPersonSourceData[0])) {
      if (key !== '姓名') {
          value = value.replace(/\,/g,'');
          value = Math.abs(Number(value)) / 1.0e+6;
          secondPersonSourceBarData.push({x: key, y: value});
      }
    }
  }

  render() {
    const {loading, selectedOption, selectedOption2, multiSelectData, barChartData} = this.state;
    const BarSeries = VerticalBarSeries;
    if (loading) {
      return <div><h1>LOADING</h1></div>;
    }

    return (
      <div style={divStyle}>
        <div>
          <MultiSelect
            value={selectedOption}
            onChange={this.handleChange}
            options={multiSelectData}
            chartData={barChartData}
            styles={customStyles1}
          />
          <MultiSelect
            value={selectedOption2}
            onChange={this.handleChange2}
            options={multiSelectData}
            chartData={barChartData}
            styles={customStyles2}
          />
        <XYPlot xType="ordinal" width={500} height={600} xDistance={100}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <BarSeries className="vertical-bar-series" data={firstPersonBarData} />
          <BarSeries data={secondPersonBarData} />
        </XYPlot>
        </div>
        <div>
          <XYPlot xType="ordinal" width={600} height={350} xDistance={100}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <BarSeries data={firstPersonSourceBarData} />
          </XYPlot>
          <XYPlot xType="ordinal" width={600} height={350} xDistance={100}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <BarSeries color={'#79C7E3'} data={secondPersonSourceBarData} />
          </XYPlot>
        </div>
      </div>
    );
  }
}
