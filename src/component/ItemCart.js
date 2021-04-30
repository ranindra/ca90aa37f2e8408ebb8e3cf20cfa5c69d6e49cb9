import styled from 'styled-components'
import star from '../img/star.svg'
import star_half from '../img/star_half.svg'
import star_empty from '../img/star_border.svg'
function ItemCart(props) {
    const ProductItem = styled.div`
    border-radius: 10px;
    background:#FFFFFF;
    margin-bottom: 24px;
    margin-right: 12px;
    box-shadow: 0px 8px 10px 0px rgba(10,31,68,0.09);
    max-width: 375px;
    `;
    const ProductWrapper = styled.div`
    padding: 4px 16px 16px`;
    const ProductRating = styled.div`
    font-size: 16px;
    font-weight: 700;
    color: #6e7679;
    display: flex;
    align-items: center;
    margin-bottom: 4px;
    span {
      color:#f9423a;
      margin-left: 4px;
      img {
        padding-top: 1px;
        max-height: 19px
      }
    }`;
    const MainText = styled.div`
    font-size: 16px;
    color: #424749;
    font-weight: 700;
    text-transform:capitalize;
    `;
    const SubText = styled.div`
    font-size:12px;
    color:#6e7679;
    margin-top: 4px;  
    text-transform:capitalize;
    `;
    const ProductBottom = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;`;
    const Price = styled(MainText)`
    margin: 16px 0`;
    const AddBtn = styled.button`
    background: #f9423a;
    color: #ffffff;
    font-size: 12px;
    font-weight: 600;
    padding: 8px 16px;
    border-radius: 4px;
    outline: none;
    border: none;
    margin: auto 0 auto auto;
    :hover {
      opacity: 0.8;
    }`;

    return (
        <ProductItem>
            <img id="img-preview" src={props.preview} alt="iamge preview" />
            <ProductWrapper>
                <ProductRating>{props.rating}
                    {
                        props.rating < 1 ?
                            <span>
                                <img src={star_half} alt="rating" />
                                <img src={star_empty} alt="rating" />
                                <img src={star_empty} alt="rating" />
                                <img src={star_empty} alt="rating" />
                                <img src={star_empty} alt="rating" />
                            </span> :
                            props.rating === 1 ?
                                <span>
                                    <img src={star} alt="rating" />
                                    <img src={star_empty} alt="rating" />
                                    <img src={star_empty} alt="rating" />
                                    <img src={star_empty} alt="rating" />
                                    <img src={star_empty} alt="rating" />
                                </span> :
                                props.rating < 2 ?
                                    <span>
                                        <img src={star} alt="rating" />
                                        <img src={star_half} alt="rating" />
                                        <img src={star_empty} alt="rating" />
                                        <img src={star_empty} alt="rating" />
                                        <img src={star_empty} alt="rating" />
                                    </span> :
                                    props.rating === 2 ?
                                        <span>
                                            <img src={star} alt="rating" />
                                            <img src={star} alt="rating" />
                                            <img src={star_empty} alt="rating" />
                                            <img src={star_empty} alt="rating" />
                                            <img src={star_empty} alt="rating" />
                                        </span> :
                                        props.rating < 3 ?
                                            <span>
                                                <img src={star} alt="rating" />
                                                <img src={star} alt="rating" />
                                                <img src={star_half} alt="rating" />
                                                <img src={star_empty} alt="rating" />
                                                <img src={star_empty} alt="rating" />
                                            </span> :
                                            props.rating === 3 ?
                                                <span>
                                                    <img src={star} alt="rating" />
                                                    <img src={star} alt="rating" />
                                                    <img src={star} alt="rating" />
                                                    <img src={star_empty} alt="rating" />
                                                    <img src={star_empty} alt="rating" />
                                                </span> :
                                                props.rating < 4 ?
                                                    <span>
                                                        <img src={star} alt="rating" />
                                                        <img src={star} alt="rating" />
                                                        <img src={star} alt="rating" />
                                                        <img src={star_half} alt="rating" />
                                                        <img src={star_empty} alt="rating" />
                                                    </span> :
                                                    props.rating === 4 ?
                                                        <span>
                                                            <img src={star} alt="rating" />
                                                            <img src={star} alt="rating" />
                                                            <img src={star} alt="rating" />
                                                            <img src={star} alt="rating" />
                                                            <img src={star_empty} alt="rating" />
                                                        </span> :
                                                        props.rating < 5 ?
                                                            <span>
                                                                <img src={star} alt="rating" />
                                                                <img src={star} alt="rating" />
                                                                <img src={star} alt="rating" />
                                                                <img src={star} alt="rating" />
                                                                <img src={star_half} alt="rating" />
                                                            </span> :
                                                            props.rating === 5 ?
                                                                <span>
                                                                    <img src={star} alt="rating" />
                                                                    <img src={star} alt="rating" />
                                                                    <img src={star} alt="rating" />
                                                                    <img src={star} alt="rating" />
                                                                    <img src={star} alt="rating" />
                                                                </span> :
                                                                <span>
                                                                    <img src={star_empty} alt="rating" />
                                                                    <img src={star_empty} alt="rating" />
                                                                    <img src={star_empty} alt="rating" />
                                                                    <img src={star_empty} alt="rating" />
                                                                    <img src={star_empty} alt="rating" />
                                                                </span>
                    }
                </ProductRating>
                <MainText>{props.title}</MainText>
                <SubText>{props.subtitle}</SubText>
                <ProductBottom>
                    <Price>Rp {props.price}</Price>
                    <AddBtn value={props.value} onClick={props.onAdd}>ADD +</AddBtn>
                </ProductBottom>
            </ProductWrapper>
        </ProductItem>
    )
}

export default ItemCart;