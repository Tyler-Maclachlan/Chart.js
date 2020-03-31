import BarController from './controller.bar';
import defaults from '../core/core.defaults';
import {clipArea, unclipArea} from '../helpers/helpers.canvas';

defaults.set('horizontalBar', {
	hover: {
		mode: 'index',
		axis: 'y'
	},

	scales: {
		x: {
			type: 'linear',
			beginAtZero: true
		},
		y: {
			type: 'category',
			offset: true,
			gridLines: {
				offsetGridLines: true
			}
		}
	},

	datasets: {
		categoryPercentage: 0.8,
		barPercentage: 0.9,
		dataLabels: {
			enabled: false,
			position: 'center',
			offset: 0,
			fontSize: defaults.fontSize,
			fontColor: defaults.fontColor,
			fontFamily: defaults.fontFamily,
			fontStyle: defaults.fontStyle
		}
	},

	elements: {
		rectangle: {
			borderSkipped: 'left'
		}
	},

	tooltips: {
		mode: 'index',
		axis: 'y'
	}
});

export default class HorizontalBarController extends BarController {

	/**
	 * @protected
	 */
	getValueScaleId() {
		return this._cachedMeta.xAxisID;
	}

	/**
	 * @protected
	 */
	getIndexScaleId() {
		return this._cachedMeta.yAxisID;
	}

	draw() {
		const me = this;
		const chart = me.chart;
		const meta = me._cachedMeta;
		const vScale = meta.vScale;
		const rects = meta.data;
		const ilen = rects.length;
		const data = me._data;
		const config = me._config;

		let i = 0;


		clipArea(chart.ctx, chart.chartArea);

		for (; i < ilen; ++i) {
			if (!isNaN(me.getParsed(i)[vScale.axis])) {
				rects[i].draw(me._ctx);
				if (config.dataLabels.enabled) {
					rects[i].drawDatalabel(me._ctx, data[i], config.dataLabels);
				}
			}
		}

		unclipArea(chart.ctx);
	}
}
