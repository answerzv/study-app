<template>
    <div style="min-height: 100vh">
        <details-head></details-head>
        <details-content></details-content>
    </div>
</template>

<script>
import DetailsHead from './components/DetailsHead'
import DetailsContent from './components/DetailsContent'

export default {
    name: 'CourseDetails',
    components: {
        DetailsHead,
        DetailsContent
    }
}
</script>

<style lang="scss" scoped>

</style>