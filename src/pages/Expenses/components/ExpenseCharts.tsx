import React from 'react';
import Card from '../../../components/Card';

const ExpenseCharts = () => {
  return (
    <Card className='p-6 mb-6 shadow-lg'>
      {/* <div
        className={cn(
          'text-xl font-semibold tracking-wider text-indigo-600 h-10',
          showPieChart && 'flex items-center'
        )}
      >
        {showPieChart && (
          <button
            className='mr-4 text-indigo-500'
            onClick={() => {
              setShowPieChart(false);
              setCurrentMonthYear(undefined);
            }}
          >
            <MdArrowBack size={20} />
          </button>
        )}
        <div>{showPieChart ? verboseMonthYear() : 'Monthly Spending'}</div>
      </div>
      <div style={{ height: 'calc(100% - 2.5rem)' }} ref={chartContainerRef}>
        {showPieChart ? (
          pieChartData && pieChartDataFormatted ? (
            <VictoryChart theme={VictoryTheme.material} width={width}>
              <VictoryAxis
                style={{
                  axis: { stroke: 'none' },
                  ticks: { stroke: 'none' },
                  tickLabels: { fill: 'none' },
                  grid: { stroke: 'none' }
                }}
              />
              <VictoryPie
                data={pieChartData}
                style={{
                  data: { fill: ({ datum }) => datum.fill },
                  labels: {
                    fontSize: 16,
                    fontWeight: 'bold',
                    padding: 16
                  }
                }}
                labels={({ datum }) =>
                  `${datum.x}: $${NumberWithCommasFormatter.format(
                    datum.y.toFixed(0)
                  )}`
                }
                endAngle={angle}
                padAngle={10}
                innerRadius={50}
                animate
              />
            </VictoryChart>
          ) : (
            <div className='grid w-full h-full place-items-center'>
              <Loader size={48} />
            </div>
          )
        ) : lineChartData && lineChartDataFormatted ? (
          <VictoryChart
            theme={VictoryTheme.material}
            width={width}
            containerComponent={
              <VictoryVoronoiContainer
                voronoiBlacklist={['line']}
                labels={({ datum }) =>
                  `${numberToMonthMapping(datum.x)}: $${datum.y}`
                }
                labelComponent={
                  <VictoryTooltip
                    flyoutStyle={{
                      fill: 'white',
                      stroke: '#455a63',
                      strokeWidth: '0.4'
                    }}
                    style={{
                      fontSize: 12,
                      fill: '#667eea'
                    }}
                    flyoutPadding={8}
                    cornerRadius={4}
                    activateData
                    constrainToVisibleArea
                  />
                }
              />
            }
          >
            <VictoryAxis
              style={{
                tickLabels: { fontSize: 12 },
                grid: { stroke: 'none' }
              }}
              fixLabelOverlap
            />
            <VictoryAxis
              style={{
                tickLabels: { fontSize: 12 },
                grid: { stroke: 'none' }
              }}
              fixLabelOverlap
              dependentAxis
            />
            <VictoryLine
              name='line'
              data={lineChartData}
              sortKey='x'
              sortOrder='ascending'
              interpolation='catmullRom'
              style={{
                data: { stroke: '#667eea' }
              }}
              animate
            />
            <VictoryScatter
              name='scatter'
              symbol='circle'
              style={{ data: { fill: '#2b4ff1', cursor: 'pointer' } }}
              size={({ active }) => (active ? 6 : 4)}
              data={lineChartData}
              events={[
                {
                  target: 'data',
                  eventHandlers: {
                    onClick: () => {
                      return [
                        {
                          target: 'data',
                          mutation: ({ datum }) => {
                            setCurrentMonthYear(datum.x);
                            setShowPieChart(true);
                          }
                        }
                      ];
                    }
                  }
                }
              ]}
              animate
            />
          </VictoryChart>
        ) : (
          <div className='grid w-full h-full place-items-center'>
            <Loader size={48} />
          </div>
        )}
      </div> */}
    </Card>
  );
};

export default ExpenseCharts;
