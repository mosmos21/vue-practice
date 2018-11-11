import { mount } from '@vue/test-utils'
import TrelloButton from '@/components/atoms/TrelloButton'

describe('TrelloButton', () => {
  describe('プロパティ', () => {
    describe('type', () => {
      it('trello-buttonクラスを持つこと', () => {
        const button = mount(TrelloButton)
        console.log(button)
        expect(button.is('button')).to.equal(true)
        expect(button.classes()).to.include('trello-button')
      })

      describe('button', () => {
        it('trello-buttonクラスを持つこと', () => {
          const button = mount(TrelloButton, {
            propsData: { type: 'button' }
          })
          expect(button.is('button')).to.equal(true)
          expect(button.classes()).to.include('trello-button')
        })
      })

      describe('text', () => {
        it('trello-button-textクラスを持つこと', () => {
          const button = mount(TrelloButton, {
            propsData: { type: 'text' }
          })
          expect(button.is('button')).to.equal(true)
          expect(button.classes()).to.include('trello-button-text')
        })
      })
    })

    describe('disabled', () => {
      describe('デフォルト', () => {
        it('disabled属性が付与されていないこと', () => {
          const button = mount(TrelloButton)
          expect(button.attributes().disabled).to.equal(undefined)
        })
      })

      describe('true', () => {
        it('disabled属性が付与されていること', () => {
          const button = mount(TrelloButton, {
            propsData: { disabled: true }
          })
          expect(button.attributes().disabled).to.equal('disabled')
        })
      })

      describe('false', () => {
        it('disabled属性が付与されていないこと', () => {
          const button = mount(TrelloButton, {
            propsData: { disabled: false }
          })
          expect(button.attributes().disabled).to.equal(undefined)
        })
      })
    })
  })

  describe('イベント', () => {
    describe('click', () => {
      it('発行されていること', () => {
        const button = mount(TrelloButton)
        button.trigger('click')
        expect(button.emitted().click.length).to.equal(1)
      })
    })
  })

  describe('スロット', () => {
    describe('コンテンツあり', () => {
      it('挿入されていること', () => {
        const button = mount(TrelloButton, {
          slots: { default: '<p>Hello</p>' }
        })
        expect(button.text()).to.equal('Hello')
      })
    })

    describe('コンテンツなし', () => {
      it('挿入されていないこと', () => {
        const button = mount(TrelloButton)
        expect(button.text()).to.equal('')
      })
    })
  })
})
