<template>
    <div>
        {{data}}
    </div>
</template>
<script>
export default {
    data(){
        return{
            data:''
        }
    },
    created(){
        this.$router.go(-1)
        // console.log('66666666666666')
    },
}
</script>