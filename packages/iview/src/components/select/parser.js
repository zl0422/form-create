import {BaseParser} from '@form-create/core';
import {toDefSlot} from '@form-create/utils';


export default class Parser extends BaseParser {
    toFormValue(value) {
        let isArr = Array.isArray(value);
        if (this.rule.props.multiple === true)
            return isArr === true ? value : [value];
        else
            return isArr === true ? (value[0] || '') : value;
    }

    render(children) {
        let {unique, rule} = this;
        return this.vNode.select(this.r.inputVData(this), () => rule.options.map((option, index) => this.vNode.option({
            props: option,
            key: `sopt${index}${unique}`,
        }, toDefSlot(option.slot, this.vm.$createElement, rule))).concat(children));
    }

    watchFormValue(n, h) {
        h.refresh();
    }
}
