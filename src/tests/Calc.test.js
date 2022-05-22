import   'regenerator-runtime/runtime'
import {mount} from '@vue/test-utils'
import Calculator from '../components/Calc'

describe('Calculator input tests', () => {
  it('Test op1 input value', async () => {
    const wrapper = mount(Calculator)

    wrapper.find('input[name=op1]').setValue('1')
    expect(wrapper.vm.op1).toBe(1)
  })

  it('Test op2 input value', async () => {
    const wrapper = mount(Calculator)

    wrapper.find('input[name=op2]').setValue('1')
    expect(wrapper.vm.op2).toBe(1)
  })
})

describe('Calculator methods tests', () => {
  it('Test plus operation', async () => {
    const wrapper = mount(Calculator)

    wrapper.find('input[name=op1]').setValue('15')
    wrapper.find('input[name=op2]').setValue('15')
    wrapper.find('button[name="+"]').trigger('click')
    expect(wrapper.vm.result).toBe(30)
  })

  it('Test minus operation', async () => {
    const wrapper = mount(Calculator)

    wrapper.find('input[name=op1]').setValue('100')
    wrapper.find('input[name=op2]').setValue('40')
    wrapper.find('button[name="-"]').trigger('click')
    expect(wrapper.vm.result).toBe(60)
  })

  it('Test divide operation', async () => {
    const wrapper = mount(Calculator)

    wrapper.find('input[name=op1]').setValue('48')
    wrapper.find('input[name=op2]').setValue('8')
    wrapper.find('button[name="/"]').trigger('click')
    expect(wrapper.vm.result).toBe('6')
  })

  it('Test multiplicate operation', async () => {
    const wrapper = mount(Calculator)

    wrapper.find('input[name=op1]').setValue('9')
    wrapper.find('input[name=op2]').setValue('4')
    wrapper.find('button[name="*"]').trigger('click')
    expect(wrapper.vm.result).toBe(36)
  })

  it('Test exponent operation', async () => {
    const wrapper = mount(Calculator)

    wrapper.find('input[name=op1]').setValue('2')
    wrapper.find('input[name=op2]').setValue('3')
    wrapper.find('button[name="**"]').trigger('click')
    expect(wrapper.vm.result).toBe(8)
  })

  describe('Error tests', () => {
    it('0 - divide error', async () => {
      const wrapper = mount(Calculator)

      wrapper.find('input[name=op2]').setValue('0')
      wrapper.find('button[name="/"]').trigger('click')
      expect(wrapper.vm.error).toBe('Делить на 0 нельзя!')
    })
  })
 })
