import   'regenerator-runtime/runtime'
import {mount} from '@vue/test-utils'
import keyboard from '../components/Keyboard'


describe('Keyboard tests', () => {
    it('Test keyboard numpads', async () => {
      const wrapper = mount(keyboard)

      wrapper.find('input[name=op1]')
      wrapper.find('input[name=op2]')
      wrapper.find('keyBtns[name="1"]').trigger('click')
      // expect(wrapper.vm.op1).toBe(1)
      expect(wrapper.vm.op2).toBe(1)
    })
 })
