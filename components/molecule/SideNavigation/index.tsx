import styled from '@emotion/styled';
import { Button } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'states';

interface SideNavigationProps {
  paths: Array<{
    href: string;
    pageName: string;
  }>;
}

const SideNavigation = ({ paths }: SideNavigationProps) => {
  // TODO: beforeRender라는 속성 추가. 콜백함수를 받아서 실행할 것
  const { userId } = useRecoilValue(userAtom);
  const {
    query: { id },
    asPath,
  } = useRouter();

  const isNotMyPage = String(userId) !== id;
  if (isNotMyPage) {
    return null;
  }

  return (
    <Navigation>
      {paths.map(({ href, pageName }, i) => (
        <Link href={href} key={i}>
          <a>
            <NavigationButton type={asPath === href ? 'primary' : 'default'} size="large">
              {pageName}
            </NavigationButton>
          </a>
        </Link>
      ))}
    </Navigation>
  );
};

const Navigation = styled.nav`
  position: absolute;
  top: 20px;
  left: 0;
`;

const NavigationButton = styled(Button)`
  display: block;
  width: 130px;
  margin-bottom: 2px;
`;

export default SideNavigation;
