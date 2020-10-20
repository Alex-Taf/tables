<template>
  <div class="about">
    <h1>{{ aboutTite }}</h1>
    <div class="about-text">
      <p class="text">{{ aboutText }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      aboutTite: 'О таблицах',
      aboutText: `Таблица состоит из упорядоченного набора строк и столбцов:
            элементы строки сравниваются между собой и имеют смысловую связь
            в столбце перечислены свойства этих элементов, по которым они сравниваются
            обычно столбец имеет название;
            его название может состоять из слова, фразы или числа;
            пересечением строки и столбца является ячейка таблицы.
            Элементы таблицы могут быть по-разному сгруппированы или расположены. Кроме того, таблица может включать метаданные, аннотации, заголовок, колонтитул.`
    }
  }
}
</script>

<style>
.about {
  display: flex;
  flex-direction: column;
}

.about-text {
  display: flex;
  justify-content: center;
  width: 100%;
}

.text {
  font-size: 2rem;
  width: 50%;
}
</style>