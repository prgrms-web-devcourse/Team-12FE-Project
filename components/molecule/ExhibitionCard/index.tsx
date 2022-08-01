import React, {useState} from 'react';
import Image from 'next/image';
import { Card } from 'antd';
import { HeartOutlined, MessageOutlined } from '@ant-design/icons';
import * as S from './style'
import Link from 'next/link'
import { ExhibitionCardProps } from 'types/model';

const { Meta } = Card;

const ExhibitionCard = ({exhibitionId, name, thumbnail, startDate, endDate, likeCount, reviewCount }: ExhibitionCardProps) => {
    const [isHover, setIsHover] = useState(false);
    const mouseHover = () => setIsHover(isHover => !isHover);

    return(
        <Link href={`exhibitions/detail/${exhibitionId}`}>
            <S.ExhibitionCard>
            <Card
                hoverable
                extra={isHover ? <S.HoverContent> <HeartOutlined />{likeCount} <MessageOutlined/> {reviewCount} </S.HoverContent> : null}
                onMouseEnter={mouseHover}
                onMouseLeave={mouseHover}
                style={{
                    width: 270,
                    height: 330,
                    position: 'relative'
                }}  
                cover={<Image alt="card image" src={thumbnail} layout='fill'/>}
            />
                <S.Description>
                    <h3>{name}</h3>
                    <div>
                        <h3>07/28 - 07/31</h3>
                        <S.Dday>D-4</S.Dday>
                    </div>
                
                </S.Description>
            </S.ExhibitionCard>
        </Link>
    )
}

export default ExhibitionCard;