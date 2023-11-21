import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface BarChartProps {
  data: any[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (data) {
      drawBarChart(data);
    }
  }, [data]);

  const drawBarChart = (data: any[]) => {
    // Configuración del gráfico
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Elimina cualquier gráfico existente antes de dibujar uno nuevo
    d3.select(chartRef.current).selectAll('*').remove();

    // Crea una nueva escala ordinal para el eje X (año)
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.year))
      .range([0, width])
      .padding(0.1);

    // Crea una nueva escala lineal para el eje Y (número de crímenes)
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.Cuenta)])
      .range([height, 0]);

    // Crea el contenedor principal del gráfico
    const svg = d3.select(chartRef.current)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Dibuja las barras
    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(d.year) || 0)
      .attr('width', xScale.bandwidth())
      .attr('y', (d) => yScale(d.Cuenta) || 0)
      .attr('height', (d) => height - yScale(d.Cuenta) || 0)
      .attr('fill', 'steelblue');
      
    // Agrega ejes X e Y
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    svg.append('g')
      .call(d3.axisLeft(yScale));
  };

  return <svg ref={chartRef} width={800} height={400}></svg>;
};

export default BarChart;
