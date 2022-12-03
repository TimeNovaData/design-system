<template>
  <q-header class="base-header">
    <div class="flex items-center justify-between w-full">
      <!-- breadcrumbs -->
      <q-breadcrumbs separator=">">
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el
          label="Kanban"
          :exact="true"
          :to="{ name: 'kanban' }"
        />
      </q-breadcrumbs>

      <div class="flex gap-8 items-center" style="--neutral-100: var(--white)">
        <OInput
          size="sm"
          placeholder="Busque por chamado, projeto.."
          class="no-label text-white/70"
          type="search"
          style="--neutral-70: rgba(var(--white), 0.7)"
        >
          <template #prepend>
            <q-icon name="search"></q-icon>
          </template>
        </OInput>

        <!-- settings -->
        <OButton
          class="text-neutral-10 w-32 h-32 !p-0 bg-white/10 !border-transparent"
          secondary
          size="sm"
        >
          <q-icon size="1.25rem" name="notifications"></q-icon>
          <q-menu class="w-[200px]">
            <q-item>
              <q-item-section>Em Breve</q-item-section>
            </q-item>
          </q-menu>
        </OButton>
        <OButton
          class="text-neutral-10 w-32 h-32 !p-0"
          tertiary
          rounded
          size="sm"
        >
          <!-- <q-icon name="person"> </q-icon> -->
          <q-avatar size="2rem" class="border border-d-neutral-10">
            <q-badge rounded class="bg-primary-pure w-8 h-8" floating></q-badge>
            <img
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBIPEhISEhASEhAVEgwNDQwMDx8REg8UGiEnJyUhJCQcLi4mKR8rIyQkJjgmKy8xNTU1GiU7QDszPy40NTEBDAwMEA8QGBISGDEdGCE0MTExMTExNDE0MTE0NDE0Pz8xMTQ0MTQ/PzQ/NDE/PzQxMTE0MT8/NDE0MTExNDQ0Mf/AABEIAOEAoQMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAgMEBQYBBwj/xAA9EAACAQIEAwUGBQMDAwUAAAABAgADEQQSITEFQVETImFxgQYykaGxwSNCUnLwBxThYtHxc4KiFSQ0NWT/xAAZAQADAQEBAAAAAAAAAAAAAAAAAgMBBAX/xAAiEQACAgIDAAIDAQAAAAAAAAAAAQIRAyESMUFRYRMycSL/2gAMAwEAAhEDEQA/APZoQhAAhCEACEIQAIQhAAhItbGU6ej1FU8gWF4y3F6ANu0Xa9xqJlgWEJWpxmg2gqDxJBAkqjiUf3WB1ta+t4WgJEIQmgEIQgAQhCABCEIAEIQgAQhCABCEIAEISDxLFikhse+RZR08YAN4/itOjce82xCnRfM8pS1+MVKh7qkL+ULcDzvK3HV9bAZqm7Dkg6k7CVxr5tM9yOSKSoO1iYrYyROxmKI973ubPchz52kZK1MmziwJZS66FG5giFLMOhB0ysCVOmxH3ijhQ9zYLdWR1Y3Qjpf6dItmpHauDKWKvdO6VYE26WM5RFRAxV2FhmKqSPWLSiyDLe2llVmurDp5GNvib6HQqrBgfeHgeohaDiyfgfaWpTNqneW+Uhrk+hmmwfGqNUDvhWOmVjbWeZ4ioVPVQMyMuoIG31i6GO2N7Ei4J2tbW3wgpA4nrgM7MbwTjzLZKhzIfddtCvhNcrhgCDcHUEagx07FaochCE0wIQhAAhCEACEIQAIQnCYAM4jELTXMx8hzY9BMjj8US5d27zZgo3JFtgOVuZkziVUsxN8xuwUdddAPCUq2zF2OY+6QBcDnYeAiNjJAlLtN+6l1YIL3c9T/AC0WKYXQC/gBZfjHMO+cX2UnY3u58T0kkUL7+dukm5Fow9ZFAP6eViTZgBfygyX118QCQPhJnZfwaRLJEcmUUUQlQ230B0B1HkRI9YBtSozWXvAWPxlk1Lw85DrUvDwsJnJgooqThxYjkStgRsYzUwqqCE98hrkk221sOstKlDS/hy5yC62MFJmuKaIuDxWRsrZu8cttAL7EAkfebn2bx5DCkcxBBKliO6QCSPlMLi0yEONQTlca2HiRL7hGJKFKg3QrcrrmTY29DLRdnPONHosIhWuARqLXB6xcqSCEIQAIQhAAhCEACR8U1kf9rKD4kSRK3ijGw6WY6c9JjAzmMqZdF3bYk94eJMhtSDFUXmM7E7kX39ZJcC5LbXVWNtSNyLxumpNQsRzuAB4aX8pOT0Vgtk2jTty8BJIWNp97nlHVHP4RKLNnRTiWT/McB+H85zrawoyyK6f8yO6Dn1uTJjiRqo3+cR6HTItQ20+Ug16Q6eQlg685EriY2BT1kuCvKzWnOEYpkJp/mB0zXs67W9P8yW6ajztY9ecRQoDM5I0HeY25XsdPn6R4PZPIlR6JwrFdrTBtZlCq6gEAG3KT5QezGIVqZS9yLMDvdfPwl/OhPRzs7CEJpgQhCABCEIAclTxN9SPIelr/AHltKbi7ZSf2hienKY+jUUWJ/J0JW9+l7n6SRSQ2NhY3axPS+8Q9MOyad0FlPK5t/mT64CgW2soHlIy9LRXTGE0318do4KoGh+HP4SFiax91PfO53AHwlZWwuITvAZ2Opd6hGu40tMspSNH2o+x0nA38MzK4nEqO8bbXCC+U89SI5h8ZUva97nUtppzNpjkjVFsvqra+l/SM1D/jzjNbEWGu1tTqDa29pUPxjmGUi1hY6mK2alRa1mt/426SCTv9D9pQ4rjeIckU0UjYk3JJvuIwlXFZgxZl1t2bqQracjBpAXTE5hzF7nxiardnUcXtdWAF7ctJFw+Lz3UjK40Ou8e4pSLFKg2ZWRidBe2hhHTFmtI03shYG1tbVAAdbG4OnwmvmQ9kRd2N9MjNlt1INwfWa+dMejlfYQhCMYEIQgAQhCADGIrrTUs2w3JlDxLEip3lsUswZlN7WG20teL0DUouo3tceYlHh6Yem3irKynkdQQZOUmnXhaEU1fp3CNnK26s/O1v4ZIx4JAymxte7aC0jcNIDW6DL5nc2j2Mc5jrsNLaRG9DxXRUV+IDDiyo1R2bIhGgLcyTsAJU8bxvEsjNTp5e42RadMVGL3GjGxAXKSRa5uLGaQUtOuliGsQfExBFhbujwCAfeKm0UaRlf7qvTp03qCoXKKa6sCAH0uLcuosdtwJO4IDWdqjLZLLkLAi7X1tLGtw7tD3id9bWHrtJ2Gw+QWHTKAIlWxuVIHA2tp4Tz7jwWlWLimd2LZRZT0J8Z6Iw11HgZRcQwoeo3mx00NvOa1oyL2ZhONVKdMutFzY5VREuCLX1Nsxv6Dxj1D2mZ0Br0OzB7NTVpksqsRcgqRm02LDS8uKWCNPVDf8AddTbxIjhXNoyX5XBuLc9xMtVRrTvvRWUCjsKisp0bKUIYMLa2I+kv6VPtKBBGqZSubcSG+DRNVRE0ykooUnTfQywTuUCR0YEk3uJsVsSfRI9j6vfsf0spIFtbiw+Rm1nlmBrVKdRETVmdgth71yDtPUEvYX3sLnxnRCV2vg58keNP5HIQhHJhCEIAEIQgAgykx2EydoV0VluANg0vDIuPW6E2vYXsNzFlG0Pjk4y+mZjhFCoqo7nW7LYHlc2J8ZPxSa5j6TuGpZQRe6WzoW3FrbxeM2B8GuZJqkiydyZHROXxHKcrFVFz5zhq2BPwme9oOJlVyJq7nIijcnqYjkqLKLbEYzizVqyUKWl2UO19hvaaOggU+/yygX2My2CwSUaah7tUbKz1F0Icm1gflGn4dTw79oj1A/dz1RUYljfmCSDMVrY0lF6ujZ1AF39esg4+lTc2z5CVsrbEdCJn6vH8im7q+jWIJJQ3tqJljxHEYl7q7oAyljfKR56bRuX0TcOtmlwPEnV2pVDd1ZlJ5EcjNDQKuNrXGoExGJpEHtQ3fGUtc6sLWIIl/w3HXVTvcKTbTTrETp7KOKktdlliqWa1vID6xzG0rU1TwufhGqlfUW66iSnIdsg9402y6c9NDHjTZGSaWxfstwrM39w/wCXNTQHW9tLzXyNgcOtGmiDZQAbczz+cky8Y0jmnLk788FQhCMKEIQgAQhCABEEXBB6WIi4QAo3XISvUlRppvGcSSVN9rMAD0AOg+EssbSAGbxGb5a/KVtbvqRsbsQD5XIk5R0VjLdlSXKqSdAFzE/p85mURqmLzOrZQGWmCBZeRJ15dPKbHGUwKdrAsVWowba9hYn7DnML7T4iphKitTbvtTVA7KGKEkCwHiRJqCTtlnkbVI1NGgt87C5uzKum50Fvjv4xnHIjU6jLcsxamgUagEWuPOxt5ymw1XE4exxK1MUjGkyNTcU3Rb3YG2h6jbbcSQ3GMMoXPhcapz5bo2e9InQnKTa36RrpNTQri7vZ3DcMC1SMitTZVpIb3FrC5IPje/hHH4enfChV1pOt7DOACSSemkj1ON4MVKgy48pkpWK4cgMwJuDcX6b6StxPtEop/h4fEtVenXV2xGVcjH3RzuBrfQTdA1J9JljxLCov4gPvBgRfRvAjyJHnK7BVRRqdmT3HytSJuCpJIAB56gyqxuKxbU89XIiE3SkFIYCxta5l7wJBWpmpUTVQrIG52BNwd7hjbxitKSdDKTi1ZYl2zqDsSqliNgTvLzg4D1+tjTUjYXtc2lK9POxbW2ZUZTpyBH1Mv/ZnDXcOdDq7KNgbWmwjTEyz5LRsIQhLnOEIQgAQhCABCEIAEIQgA1Vp5lIPMWv0lCTqwJtq1htl1sbyTi+MquKp4RO/XcGrUAOlCkN2PiToB6+bfE0yPc+64Bv/AKhymSWrGi7YxWp3KEcwqsTrYKCR9JjfaPhva1Lhdsqg3vYX1JPhsPObGmfkWVdd9he0BheRtl7xJG5AtqT5iK1aGTaeymwYOS3vEZVYsL303i8QFZFyp+bLdRY9ftF1BbLa+W7OSu1td49RAbQlW1sdLhF3tb6yfEssjrorThs2ii5sxILEDy2nMbhSmVzTW+VbsBoNwbm1gZYFc1Qqvu21Zhq5BB36a6RVcZk7MA7XZW1JAI1HnYQ4qjXketGS4rhe0CruMyhiNwQSTb4Sy4Dg+4FJuMzqCug3uCfMH6yXw7C5qhDe5ZWQ6EE8/prH8FTFPPTXkWYAA2PS/oZsVSJzlbHBhBmI1vdWPIXF7CaPgdDKhJFiSQLC2kquG0TWqW/KoGdtN+X1moAtt6CUS9ItsXCEIxgQhCABCEIAchEMwAuTYbkk2tKTiHtbw/DX7TGUcwGq027R/glzNpvoxtIvZm/aP2uwvDwQ7B69iUw1M3e9tL9B569AZ597U/1Lq4jNSwYajTN1OIa3auPDXuj4nymFDkAknMxLMzMSSTuSTzloYG9sjPLWkerf0sqNiqmOxlU5qzvTpk8lWxNh0GwHgonoGLw4qoU2uLq1rlW5GeYf0YxoDYqifzdlVQdSLg/aesCTyLbRSDdJmQo1SlQ0qgy1lDMyE6OP1r1U29DoZYoQFseii3XwvJvFOGpiFW91qIc1Kstg6Hz6HmOcqqdRldqdRcrqLgW0qDqPDw5SSVFuV/0RjdFta5szMRsBewEqKblGsWNit2VVILm+3yl1WAPdGpJvYfmFvteQsSFBsN+8C35VGmw9LCY0NGVaI9bFZCNgcikDlbTUTtGuFdQQbqGzAk2ykgkkRDoHbX9DA2sQh5H0tJOHw9wuYc1IzWuMpGp+A9YqQzkmgNPIrKpzMGYo25tpf6yvx+LWjeoxyLZgxYgC4FtuewtLWpzckKl2uGNtNQDfx3nnntBjH4liaeDw/eSo6hivQE3J6AAE+U1v4FStu+jYYfjb4LBJjGGZP7il/ci2ppOSCbDmLhvS03tCqtRVdGDIwDKym4YHUETHe2fDlpcIxFJRolJWv1KkG/ynlfsv7bYvhZAU9rh73bCVWOUa65T+U+Vx1E6I43KOu0c0p1L6Z9FzkyPBP6g8OxgA7cUKhGtHF/h2PQMe6fQ38JrFYMLg3BFwQbgiI012h00xyEITDQhCEAPlriHGsTij+NiKtXW9qlQsq+QvYekiIt/vGMxG3qCN49TqA6WIPS1x8Z6CpHG7eyRTnWe+giBOqY1itbs1v9M65p8QpC+j5kPjoTae9ifNPAsZ/bYrD1f0VaTHyuAfkTPpVTcfMGcedVK/k6MLtHWEreJ8PTEIUYsp7xSqhyvTbkQZZmIK3kSvp5ficfi+HVBSxQFSmWtRxijKKi22J5N1EsFx1Or3rm9lUgjS+/IzZ4/A08TTanVRXRhYqw+YPI9CNZ5fx3A1OG1Gak7VsKMqs4GZ8Ob2AfqOjehkZRlHado6ISjLTVM0IxCLqTe+oABIPS95XY3jhVSQ/dBuzEAtfXQdN5TvxpDTJ1zZbA6W8xKLG47PZF90HNzsTJOciyxxQ/xXjtXEaF2Wn+kE2I8Zv/6d+zH9rT/uaq2xFVborjWnTOoBHInQnpoJmfYfgyVagxOIUmij2prluKlQa3I/Stx5nynrquGAZTcEXVl1BEtii3/pkM0l+qKT2yXNgMYP/wA9c29D/tPnQrcek+k+PJnw9dP1UcQlvNSJ82r7o8lnoYfTz83aI5WWfCuP4zAn/wBtiqlMXzdmrZqZPUqbqfUSCVjbm30sBfWVcU1sSMt6PTuDf1drJZcXh0qjQdrhz2b26kG6k+WUTe8G9u+HY2wTErTqG34OL/Ca/QE90n9pM+ctTvp0AheSlhi+tFVka+z6y7ZP1r8RCfJukIn4Ps38v0PBBz9RtHQgtp8ohDex8NfPYxwCdJDZyLEQYpR/zGMsUf4Z9HeyvEBisFhqt7lqSBv3KLH5gz5xI/zPX/6PcQzYarh2OtOoaiD/AEOAT8/rOfOrin8FsLptHpE5CN1qgRWZtlBJPhOU6Cl9o+Ldiop0yO1YXY31ROvmeUquEMpOXJmDBlqIwurKRYgg7yoxtCrWqvVbd2ZgNe6NgB5CWvCEZLHfxPSalZl0efe2/Av/AE/E5Kf/AMeorVsOpuQgvqnodvAiWPsx7GPXC1cQTTokKyoNKlQcj4Keu/TrN7x3hCY44Y1LWpVGqOpFzUUgaeRIF/CS8ULLp05SSxLk34XeZ8UvSmxDpTUJTVVRFVKdNNFReQ/m8OAcSdapRz+E5sub8jbAjwOxjVTDltObHMfKdxGDyrpvblvK14iP9NNihcEeDKR6T5qcZSR0ZlPoSJ9H0qhenTc7sqlv3bH5ifOWIP4lT/qVbfEzpw9s583SGGEbI/xHGjdv4ZZkUJtOf72tO3gwmDI5aEVCBo5SNrj/ALh9DHUMjk5WB8bHy2j4moV+MV/BOTtoCMKdtNv/AEsx3Y4moDsVVmHVQbH6g+kxNpd+xeJ7PHUv0v2lJvJgbfMCTmri0Ug6kmfRYN/rcSt4m+bLTHPvP5chDheJvTIY6oLMTuVtcGJw34g7QjVizAHpsJxJHWRhhxa1vWcwWHAYjl71pPCWMTTS1Q/tY39RNMqx1EjeJpd0+TSUoiK4sreTQNIGGw4tcj1jdbDZjJoFlA8FJhU0HppAwiIwy2H5GZT52B+8+cap/Eqfvq/Uz6F9ynWbpmcnxsZ871Dd6n73PzJl8HbI5jjmNCLaJAlyCYEaxDbiOWjT7/ATGMtioTl4QNoXVFxHEa4HlYnx2MS4hRNrjxzD6Gb6Z5Q6DAGE5ebYtCw0lcLxHZYijU/RVpOfIEXkITrf8THvRidH0fTogEFfdIsbcxuBLCmoUADQAWAlRwGv22EoVP1UqT38SBeWyHScL7O1dHXW8RROp8lB+MWDEUR3nPiunjrAYkCcri6N5NOKdB1u1+onGN0Pk2kAEkfSN1Dp4W+ccGg9I06309TAUpuNkph6lvzBr25z5/qL3n/cxPxM+gfaU/hhRzLfCfP1Q6sf9TH5y+H0jmfQyRACdP8AzCXICTGm3j0ZI/3EJDROXhCEUckv942m5/aftCE1ijvSCwhNFFiHWEIA+z3v2H/+vwv/AElmip7TkJxPtnXHpChOUt38x9IQmDjj8vP7Qb3T5QhAwQ20SIQgzCk9o/dHkfpPnw/c/WEJ0YemQzeCf94gTsJYiJMbaEISGRyEIRTT/9k="
              alt=""
            />
          </q-avatar>
          <BaseHeaderMenu></BaseHeaderMenu>
        </OButton>
      </div>

      <!-- Avatar -->
    </div>
  </q-header>
</template>

<script setup>
import OInput from 'src/components/Input/OInput.vue'
import OButton from 'src/components/Button/OButton.vue'
import BaseHeaderMenu from './BaseHeaderMenu.vue'
</script>

<style lang="sass">
:root
  --header-bg: rgb(var(--white))
  --header-color: rgb(var(--neutral-60))
  --breadcrumb-color: rgb(var(--neutral-60))
  --header-base-height: 2.5rem

.base-header
  height: var(--header-base-height)
  display: flex
  align-items: center
  padding: .5625rem 1rem
  background: var(--header-bg)
  width: calc(100% - var(--Nv0-sidebar-width))
  margin-left: auto
  color: var(--header-color)
  border-bottom: 1px solid rgba(var(--white),0.1) !important



  .q-breadcrumbs
    .q-breadcrumbs__separator
      color: var(--breadcrumb-color)
    .q-breadcrumbs__el
      color: var(--breadcrumb-color)
</style>
