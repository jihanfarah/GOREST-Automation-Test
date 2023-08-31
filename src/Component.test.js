
import { $, expect } from '@wdio/globals'
import { createApp } from 'vue'

import ExampleComponent from './Component.vue'
import './Component.css'

describe('Vue Component Testing', () => {
    
    let container

    beforeEach(() => {
        container = document.createElement('div')
        container.setAttribute('id', 'app')
        document.body.appendChild(container)
    })

    afterEach(() => {
        container?.remove()
    })
    

    it('should test component with WebdriverIO', async () => {
        createApp(ExampleComponent, { msg: 'WebdriverIO Component Testing' }).mount(container)

        const component = await $('button*=count is')
        await expect(component).toBePresent()
        await expect(component).toHaveText('count is 0')

        await component.click()
        await component.click()

        await expect(component).toHaveText('count is 2')
    })
})
