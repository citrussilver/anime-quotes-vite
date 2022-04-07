<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from './components/HelloWorld.vue'
import { onMounted, ref, reactive } from 'vue'
import { aniQuote, generateAniQuote } from './composables/getAnimeQuote'

export default {
  setup() {
    let loading = ref(false)
    console.log(loading)
    let scrollableContainer = ref(false)
    let textCenter = ref(false)
    let textLeft = ref(false)

    const loadAniQuote = async () => {
      try {
        loading.value = true
        await generateAniQuote()
        console.log(aniQuote.quoteLength)

        if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/iPhone/i) 
            || navigator.userAgent.match(/iPad/i)) {
            if(aniQuote.quoteLength > 215) {
              scrollableContainer.value = false
              // quote.classList.remove('scrollable-container')
                
              scrollableContainer.value = true
              // quote.classList.add('scrollable-container')
              console.log('quoteLength > 215')
            } else {
                scrollableContainer.value = false
                // quote.classList.remove('scrollable-container')
                textCenter.value = false
                // quote.classList.remove('text-center')
                textLeft.value = false
                // quote.classList.remove('text-left')
                textCenter.value = true
                // quote.classList.add('text-center')
                console.log('quoteLength < 215')
            }
        } else {
            if(aniQuote.quoteLength > 449) {
                scrollableContainer.value = false
                // quote.classList.remove('scrollable-container')
                scrollableContainer.value = true
                // quote.classList.add('scrollable-container')
                console.log('quoteLength > 449')
                
            } else if (aniQuote.quoteLength < 50) {
                scrollableContainer.value = false
                // quote.classList.remove('scrollable-container')
                textLeft.value = false
                // quote.classList.remove('text-left')
                textCenter.value = true
                // quote.classList.add('text-center')
              console.log('quoteLength < 50')
            } else {
                scrollableContainer.value = false
                // quote.classList.remove('scrollable-container')
                textCenter.value = false
                // quote.classList.remove('text-center')
                textLeft.value = true
                // quote.classList.add('text-left')
              console.log('desktop else')
            }
        }
        loading.value = false
      } catch (error) {
        console.log(error)
      }
    }

    onMounted(async () => {
        loadAniQuote()
    })

    return { loading, aniQuote, loadAniQuote, scrollableContainer, textCenter, textLeft }
  }
}
</script>

<template>
  <div class="container">
        <div id="subtitle">
            <h3>Random Anime Quote</h3>
            <h4></h4>
        </div>
        <div class="outputEl">
          <div class="spinner-wrapper" v-if="loading">
            <div class="spinner">
                <div></div>
                <div></div>
            </div>
          </div>
          <div class="quote-wrapper" v-else>
            <div id="quote" :class="{ 'scrollable_container' : scrollableContainer, 'text_center': textCenter, 'text_left' : textLeft }">{{aniQuote.quote}}</div>
            <!-- :class="{ 'class-1': this.isActive, 'class-2 ': this.isActive }" -->
            <div id="character">{{aniQuote.character}}</div>
            <div id="animeTitle">{{aniQuote.anime}}</div>
          </div>
        </div>
        <button id="consumeBtn" class="btn" @click="loadAniQuote">
            <div class="btn-content">
                <p>
                    <span class="material-icons">
                        auto_awesome
                    </span>
                </p>
                <p id="btn-text">Get animu quotes</p>
            </div>
        </button>
  </div>
</template>

<style>

</style>
